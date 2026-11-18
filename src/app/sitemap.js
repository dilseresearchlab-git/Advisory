
import { siteConfig } from "@/config/site";
import { getArticles } from "@/lib/articles";

export const revalidate = 300;

const staticPages = [
  "/",
  "/about",
  "/advisory",
  "/pricing",
  "/research",
  "/articles",
  "/tools",
  "/learn",
  "/contact",
  "/disclosures",
  "/privacy",
  "/terms",
];

export default async function sitemap() {
  const now = new Date();

  const pages = staticPages.map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const { articles, source } = await getArticles();

  // Never include development fallback content in the sitemap.
  const articlePages =
    source === "sanity"
      ? articles
          .filter((article) => article.slug)
          .map((article) => ({
            url: new URL(
              `/articles/${article.slug}`,
              siteConfig.url
            ).toString(),
            ...(article.publishedAt && {
              lastModified: new Date(article.publishedAt),
            }),
            changeFrequency: "monthly",
            priority: 0.6,
          }))
      : [];

  return [...pages, ...articlePages];
}
