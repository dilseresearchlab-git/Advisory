import { getArticles, splitFeatured } from "@/lib/articles";
import ArticlesHero from "@/components/pages/articles/ArticlesHero";
import FeaturedArticle from "@/components/pages/articles/FeaturedArticle";
import ArticleList from "@/components/pages/articles/ArticleList";
import ArticlesCTA from "@/components/pages/articles/ArticlesCTA";
import { Container } from "@/components/ui";

export const metadata = {
  title: "Articles & Insights",
  description:
    "Research notes, company studies and market perspectives from Meridian Research & Advisory.",
};

export const revalidate = 300;

export default async function ArticlesPage() {
  const { articles, source, error } = await getArticles();
  const { featured, rest } = splitFeatured(articles);

  return (
    <>
      <ArticlesHero />

      {source === "sample" && (
        <Container className="pt-6">
          <div
            role="status"
            className="border-l-2 border-royal bg-ice-50 px-4 py-3 text-sm leading-relaxed text-muted"
          >
            {error
              ? "Live articles could not be loaded. Showing clearly labelled sample content instead."
              : "Preview content is being shown. Connect the Sanity dataset to display published articles."}
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
