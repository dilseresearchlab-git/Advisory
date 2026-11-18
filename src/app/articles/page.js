import { getArticles, splitFeatured } from "@/lib/articles";
import ArticlesHero from "@/components/pages/articles/ArticlesHero";
import FeaturedArticle from "@/components/pages/articles/FeaturedArticle";
import ArticleList from "@/components/pages/articles/ArticleList";
import ArticlesCTA from "@/components/pages/articles/ArticlesCTA";
import { Container } from "@/components/ui";

import { generatePageMetadata } from "@/lib/seo/metadata";
import { pageSchema } from "@/lib/seo/schemas";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = generatePageMetadata({
  title: "Stock Market Research Articles & Insights",
  description:
    "Explore stock market research articles, company analysis, financial insights and market perspectives for Indian investors and traders.",
  path: "/articles",
});

export const revalidate = 300;

export default async function ArticlesPage() {
  const { articles, source, error } = await getArticles();
  const { featured, rest } = splitFeatured(articles);

  return (
    <>
      <JsonLd
        data={pageSchema({
          path: "/articles",
          name: "Stock Market Research Articles & Insights",
          description:
            "Explore stock market research articles, company analysis, financial insights and market perspectives for Indian investors and traders.",
        })}
      />
      <ArticlesHero />

      {source === "unavailable" && (
        <Container className="pt-6">
          <div
            role="status"
            className="border-l-2 border-amber-500 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-muted"
          >
            Articles are temporarily unavailable. Please check back soon.
          </div>
        </Container>
      )}

      {featured ? (
        <FeaturedArticle article={featured} />
      ) : (
        <section className="border-y border-line bg-white">
          <Container className="py-16 text-center sm:py-20">
            <p className="eyebrow">Meridian Research</p>
            <h2 className="mt-3 font-serif text-2xl text-midnight sm:text-3xl">
              Fresh perspectives are on the way.
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-muted">
              Our research team is preparing company studies and market
              perspectives. Please check back soon.
            </p>
          </Container>
        </section>
      )}

      <ArticleList articles={rest} />
      <ArticlesCTA />
    </>
  );
}
