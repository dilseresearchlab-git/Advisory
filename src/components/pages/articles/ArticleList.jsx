"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Container } from "@/components/ui";
import CoverImage from "./CoverImage";
import ArticleMeta, { CategoryTag } from "./ArticleMeta";

const PAGE_SIZE = 6;

export default function ArticleList({ articles = [] }) {
  const [category, setCategory] = useState("All");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(articles.map((article) => article.category).filter(Boolean)))],
    [articles]
  );

  const filtered = useMemo(
    () =>
      category === "All"
        ? articles
        : articles.filter((article) => article.category === category),
    [articles, category]
  );

  const shown = filtered.slice(0, visible);

  function chooseCategory(nextCategory) {
    setCategory(nextCategory);
    setVisible(PAGE_SIZE);
  }

  return (
    <section
      id="latest"
      aria-labelledby="latest-title"
      className="scroll-mt-20 bg-white"
    >
      <Container className="py-14 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-2xl">
            <p className="eyebrow">From the research desk</p>
            <h2 id="latest-title" className="mt-3 text-3xl text-midnight sm:text-4xl">
              Latest Insights
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
              Recent research notes, company studies and market perspectives
              from the Meridian team.
            </p>
          </div>
          {articles.length > 0 && (
            <span className="text-xs text-steel">
              {articles.length} {articles.length === 1 ? "article" : "articles"}
            </span>
          )}
        </div>

        {categories.length > 2 && (
          <div
            className="-mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
            role="group"
            aria-label="Filter articles by category"
          >
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={category === item}
                onClick={() => chooseCategory(item)}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                  category === item
                    ? "border-navy bg-navy text-white"
                    : "border-line bg-white text-steel-dark hover:border-royal hover:text-royal"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {shown.length === 0 ? (
          <div className="mt-10 border-y border-line py-12 text-center">
            <p className="font-serif text-xl text-midnight">
              {articles.length === 0
                ? "More research is on the way."
                : "No articles in this category yet."}
            </p>
            <p className="mt-2 text-sm text-muted">
              {articles.length === 0
                ? "New perspectives will appear here as they are published."
                : "Choose another category to explore the latest insights."}
            </p>
          </div>
        ) : (
          <ul className="mt-8 border-b border-line">
            {shown.map((article) => {
              const href = `/articles/${article.slug}`;

              return (
                <li key={article.id} className="border-t border-line">
                  <article className="group grid gap-5 py-7 sm:grid-cols-[240px_1fr] sm:gap-8 lg:grid-cols-[280px_1fr] lg:py-8">
                    <Link
                      href={href}
                      className="block"
                      aria-label={`Read ${article.title}`}
                    >
                      <CoverImage
                        article={article}
                        sizes="(min-width: 1024px) 280px, (min-width: 640px) 240px, 100vw"
                      />
                    </Link>

                    <div className="self-center">
                      <CategoryTag>{article.category}</CategoryTag>
                      <h3 className="mt-3 text-xl leading-snug text-midnight sm:text-2xl">
                        <Link
                          href={href}
                          className="transition-colors hover:text-royal"
                        >
                          {article.title}
                        </Link>
                      </h3>
                      <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">
                        {article.excerpt}
                      </p>
                      <div className="mt-4">
                        <ArticleMeta article={article} />
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        )}

        {filtered.length > 0 && (
          <div className="mt-8 flex flex-col items-center gap-3">
            <p className="text-xs text-steel" role="status" aria-live="polite">
              Showing {shown.length} of {filtered.length}{" "}
              {filtered.length === 1 ? "article" : "articles"}
            </p>

            {visible < filtered.length && (
              <button
                type="button"
                onClick={() => setVisible((count) => count + PAGE_SIZE)}
                className="rounded-full border border-ice-300 bg-white px-6 py-2.5 text-sm font-medium text-navy transition-colors hover:border-royal hover:text-royal"
              >
                Load more articles
              </button>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
