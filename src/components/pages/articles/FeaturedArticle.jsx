import Link from "next/link";
import { Container } from "@/components/ui";
import CoverImage from "./CoverImage";
import ArticleMeta, { CategoryTag } from "./ArticleMeta";

export default function FeaturedArticle({ article }) {
  if (!article) return null;

  const href = `/articles/${article.slug}`;

  return (
    <section aria-labelledby="featured-title" className="border-b border-line bg-white">
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="mb-7 flex items-center justify-between border-b border-line pb-4">
          <p className="eyebrow">Editor's selection</p>
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-steel">
            Featured research
          </span>
        </div>

        <article className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <Link
            href={href}
            className="group block"
            aria-label={`Read ${article.title}`}
          >
            <CoverImage
              article={article}
              priority
              aspect="aspect-[16/10]"
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
          </Link>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <CategoryTag>{article.category}</CategoryTag>
              <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-royal">
                <span className="h-1.5 w-1.5 rounded-full bg-royal" aria-hidden="true" />
                Featured
              </span>
            </div>

            <h2
              id="featured-title"
              className="mt-4 text-[28px] leading-tight text-midnight sm:text-4xl"
            >
              <Link href={href} className="transition-colors hover:text-royal">
                {article.title}
              </Link>
            </h2>

            {article.subtitle && (
              <p className="mt-3 font-serif text-lg italic leading-relaxed text-steel-dark">
                {article.subtitle}
              </p>
            )}

            <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
              {article.excerpt}
            </p>

            <div className="mt-5">
              <ArticleMeta article={article} showAuthor />
            </div>

            <Link
              href={href}
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-royal transition-all hover:gap-3 hover:text-navy"
            >
              Read article <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
      </Container>
    </section>
  );
}
