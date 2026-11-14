import { notFound } from "next/navigation";
import { getArticle, getRelated, getAllSlugs, siteUrl } from "@/lib/article";
import { buildHeadings } from "@/lib/portableText";
import { imageUrl } from "@/lib/sanityImage";
import { Container, Notice } from "@/components/ui";
import ReadingProgress from "@/components/articles/detail/ReadingProgress";
import ArticleHeader from "@/components/articles/detail/ArticleHeader";
import ArticleCover from "@/components/articles/detail/ArticleCover";
import ArticleLayout from "@/components/articles/detail/ArticleLayout";
import ArticlePortableText from "@/components/articles/detail/ArticlePortableText";
import ArticleAuthor from "@/components/articles/detail/ArticleAuthor";
import ArticleDisclaimer from "@/components/articles/detail/ArticleDisclaimer";
import RelatedArticles from "@/components/articles/detail/RelatedArticles";
import ArticleCTA from "@/components/articles/detail/ArticleCTA";

// Re-fetch from Sanity at most every 5 minutes; unknown slugs are rendered on demand.
export const revalidate = 300;

export async function generateStaticParams() {
  return (await getAllSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { article } = await getArticle(slug);
  if (!article) return { title: "Article not found", robots: { index: false } };

  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.excerpt || undefined;
  const canonical = siteUrl ? `${siteUrl}/articles/${article.slug}` : undefined;
  const og = article.cover ? imageUrl(article.cover, { width: 1200, height: 630, focal: true }) : null;

  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      type: "article",
      title,
      description,
      url: canonical,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || undefined,
      authors: article.author?.name ? [article.author.name] : undefined,
      images: og ? [{ url: og, width: 1200, height: 630, alt: article.cover.alt || title }] : undefined,
    },
    twitter: { card: og ? "summary_large_image" : "summary", title, description, images: og ? [og] : undefined },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const { article, source } = await getArticle(slug);
  if (!article) notFound();

  // TOC and heading anchors come from the SAME body data and the SAME generated IDs.
  const { headings, ids } = buildHeadings(article.body);
  const related = await getRelated(article);
  const canonical = siteUrl ? `${siteUrl}/articles/${article.slug}` : undefined;

  return (
    <>
      <ReadingProgress targetId="article-body" />
      {source === "sample" && (
        <Container className="pt-6">
          <Notice title="Sample content">
            Showing an illustrative placeholder article. Set the Sanity environment variables to publish live articles.
          </Notice>
        </Container>
      )}
      <ArticleHeader article={article} />
      <ArticleCover cover={article.cover} category={article.category} title={article.title} />
      <ArticleLayout headings={headings} title={article.title} canonical={canonical}>
        <ArticlePortableText value={article.body} ids={ids} />
        <ArticleAuthor author={article.author} />
        <ArticleDisclaimer />
      </ArticleLayout>
      <RelatedArticles articles={related} />
      <ArticleCTA />
    </>
  );
}
