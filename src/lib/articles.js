import { sanityConfigured, sanityFetch } from "@/lib/sanity";
import { sampleArticles } from "@/data/articlesSample";

const ARTICLES_QUERY = `*[
  _type == "article" &&
  !(_id in path("drafts.**")) &&
  defined(slug.current) &&
  defined(publishedAt) &&
  publishedAt <= now()
]
| order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  subtitle,
  excerpt,
  "category": coalesce(category->title, category),
  featured,
  publishedAt,
  readingTime,
  "author": coalesce(author->name, author),
  "coverUrl": coverImage.asset->url,
  "coverAlt": coverImage.alt
}`;

const DEFAULT_CATEGORY = "Market Perspectives";

export function normalise(article) {
  return {
    id: article._id,
    title: article.title || "Untitled article",
    slug: article.slug,
    subtitle: article.subtitle || "",
    excerpt: article.excerpt || "",
    category:
      typeof article.category === "string"
        ? article.category
        : article.category?.title || DEFAULT_CATEGORY,
    featured: Boolean(article.featured),
    publishedAt: article.publishedAt || null,
    readingTime: Number(article.readingTime) || null,
    author:
      typeof article.author === "string"
        ? article.author
        : article.author?.name || "Meridian Research",
    coverUrl: article.coverUrl || null,
    coverAlt: article.coverAlt || "",
  };
}

export async function getArticles() {
  if (!sanityConfigured) {
    return {
      articles: sampleArticles.map(normalise),
      source: "sample",
      error: null,
    };
  }

  try {
    const result = await sanityFetch(ARTICLES_QUERY, { revalidate: 300 });
    const articles = Array.isArray(result) ? result.map(normalise) : [];

    return {
      articles: articles.sort(
        (a, b) =>
          new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0)
      ),
      source: "sanity",
      error: null,
    };
  } catch (error) {
    console.error("[articles] Sanity fetch failed:", error);
    return {
      articles: sampleArticles.map(normalise),
      source: "sample",
      error: error instanceof Error ? error.message : "Unknown Sanity error",
    };
  }
}

export function splitFeatured(articles) {
  if (!articles.length) return { featured: null, rest: [] };

  const featured = articles.find((article) => article.featured) || articles[0];

  return {
    featured,
    rest: articles.filter((article) => article.id !== featured.id),
  };
}

export function formatDate(iso) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(date);
}
