// Article detail data: fetch by slug, related-article ranking, static params.
// Publishing rules are enforced in the query AND here: published, not a draft,
// not future-dated.

import { cache } from "react";
import { sanityConfigured, sanityFetch } from "./sanity";
import { normalise } from "./articles";
import { sampleArticles } from "@/data/articlesSample";
import { sampleBody } from "@/data/articleSampleBody";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");

const IMAGE = `{ alt, caption, hotspot, crop, asset->{ url, metadata{ dimensions } } }`;

const DETAIL_QUERY = `*[_type == "article" && slug.current == $slug && defined(publishedAt) && publishedAt <= now() && !(_id in path("drafts.**"))][0]{
  _id, title, "slug": slug.current, subtitle, excerpt,
  "category": coalesce(category->title, category),
  featured, publishedAt, updatedAt, readingTime, tags, seoTitle, seoDescription,
  "author": select(
    defined(author->name) => author->{ name, bio, "image": image${IMAGE} },
    defined(author) => { "name": author }
  ),
  coverImage${IMAGE},
  body[]{
    ...,
    _type == "image" => { ..., asset->{ url, metadata{ dimensions } } },
    _type == "relatedArticles" => { ..., articles[]->{ _id, title, "slug": slug.current, excerpt } }
  }
}`;

const CARD_FIELDS = `_id, title, "slug": slug.current, excerpt,
  "category": coalesce(category->title, category),
  featured, publishedAt, readingTime, tags,
  "author": coalesce(author->name, author),
  "coverUrl": coverImage.asset->url, "coverAlt": coverImage.alt`;

const RELATED_QUERY = `*[_type == "article" && _id != $id && defined(slug.current) && defined(publishedAt) && publishedAt <= now() && !(_id in path("drafts.**"))]
  | order(publishedAt desc)[0...40]{ ${CARD_FIELDS} }`;

const SLUGS_QUERY = `*[_type == "article" && defined(slug.current) && publishedAt <= now() && !(_id in path("drafts.**"))].slug.current`;

function shapeDetail(a) {
  return {
    id: a._id,
    title: a.title || "Untitled",
    slug: a.slug,
    subtitle: a.subtitle || "",
    excerpt: a.excerpt || "",
    category: a.category || "",
    featured: Boolean(a.featured),
    publishedAt: a.publishedAt,
    updatedAt: a.updatedAt || null,
    readingTime: Number(a.readingTime) || null,
    tags: Array.isArray(a.tags) ? a.tags : [],
    seoTitle: a.seoTitle || "",
    seoDescription: a.seoDescription || "",
    author: a.author?.name ? { name: a.author.name, bio: a.author.bio || "", image: a.author.image || null } : null,
    cover: a.coverImage?.asset?.url ? a.coverImage : null,
    body: Array.isArray(a.body) ? a.body : [],
  };
}

function sampleDetail(s) {
  const body = s.body || sampleBody(s);
  return shapeDetail({
    ...s,
    updatedAt: s.updatedAt,
    author: { name: s.author, bio: "Illustrative sample author profile. Replace with an author document in Sanity." },
    body,
  });
}

// Returns { article, source } with article = null when missing/unpublished/future-dated.
export const getArticle = cache(async (slug) => {
  if (sanityConfigured) {
    try {
      const raw = await sanityFetch(DETAIL_QUERY, { params: { slug } });
      if (!raw) return { article: null, source: "sanity" };
      // Defence in depth: never render drafts or future-dated content.
      if (String(raw._id).startsWith("drafts.") || new Date(raw.publishedAt) > new Date()) return { article: null, source: "sanity" };
      return { article: shapeDetail(raw), source: "sanity" };
    } catch (err) {
      console.error("[article] Sanity fetch failed, trying sample content:", err.message);
    }
  }
  const s = sampleArticles.find((a) => a.slug === slug);
  return { article: s ? sampleDetail(s) : null, source: "sample" };
});

// Same category first, then shared tags, then most recent. Pure, so it is testable.
export function rankRelated(current, candidates, limit = 3) {
  const now = Date.now();
  const tagSet = new Set((current.tags || []).map((t) => String(t).toLowerCase()));
  return candidates
    .filter(
      (c) =>
        c.id !== current.id &&
        !String(c.id).startsWith("drafts.") &&
        c.slug &&
        c.publishedAt &&
        new Date(c.publishedAt).getTime() <= now
    )
    .map((c) => {
      const shared = (c.tags || []).filter((t) => tagSet.has(String(t).toLowerCase())).length;
      const sameCategory = current.category && c.category === current.category ? 1 : 0;
      return { c, score: sameCategory * 10 + shared * 3 };
    })
    .sort((a, b) => b.score - a.score || new Date(b.c.publishedAt) - new Date(a.c.publishedAt))
    .slice(0, limit)
    .map((x) => x.c);
}

export async function getRelated(article) {
  let candidates = [];
  if (sanityConfigured) {
    try {
      const rows = await sanityFetch(RELATED_QUERY, { params: { id: article.id } });
      candidates = (rows || []).map(normalise);
    } catch (err) {
      console.error("[article] related fetch failed:", err.message);
    }
  } else {
    candidates = sampleArticles.map(normalise);
  }
  return rankRelated(article, candidates, 3);
}

export async function getAllSlugs() {
  if (sanityConfigured) {
    try {
      const slugs = await sanityFetch(SLUGS_QUERY);
      if (Array.isArray(slugs)) return slugs;
    } catch (err) {
      console.error("[article] slug fetch failed:", err.message);
    }
    return [];
  }
  return sampleArticles.map((a) => a.slug);
}
