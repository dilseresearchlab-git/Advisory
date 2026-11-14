import Link from "next/link";
import { Container } from "@/components/ui";
import { CategoryTag } from "@/components/pages/articles/ArticleMeta";
import { formatDate } from "@/lib/articles";

const sep = "border-l border-line pl-4";

// Centered editorial introduction. Metadata that isn't in the CMS is simply not shown.
export default function ArticleHeader({ article }) {
  const { title, subtitle, excerpt, category, featured, author, publishedAt, updatedAt, readingTime } = article;
  // Only show "Updated" when the editor set it and it falls on a later day than publication.
  const showUpdated = updatedAt && formatDate(updatedAt) !== formatDate(publishedAt) && new Date(updatedAt) > new Date(publishedAt);

  return (
    <header className="border-b border-line bg-gradient-to-b from-ice-100 to-white">
      <Container className="py-10 sm:py-14">
        <nav aria-label="Breadcrumb" className="text-center text-xs text-steel">
          <ol className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <li><Link href="/" className="hover:text-royal">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/articles" className="hover:text-royal">Articles</Link></li>
            {category && (
              <>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-medium text-navy">{category}</li>
              </>
            )}
          </ol>
        </nav>

        <div className="mx-auto mt-8 max-w-3xl text-center">
          {(category || featured) && (
            <div className="flex flex-wrap items-center justify-center gap-3">
              {category && <CategoryTag>{category}</CategoryTag>}
              {featured && (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-royal">
                  <span className="h-1.5 w-1.5 rounded-full bg-royal" aria-hidden="true" />
                  Featured
                </span>
              )}
            </div>
          )}

          <h1 className="mt-5 text-4xl leading-[1.1] sm:text-5xl lg:text-[3.4rem]">{title}</h1>
          {subtitle && <p className="mt-4 font-serif text-xl italic leading-snug text-steel-dark sm:text-2xl">{subtitle}</p>}
          {excerpt && <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">{excerpt}</p>}

          <p className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-steel-dark">
            {author?.name && <span>By <span className="font-medium text-navy">{author.name}</span></span>}
            {publishedAt && (
              <span className={author?.name ? sep : ""}>
                <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
              </span>
            )}
            {showUpdated && (
              <span className={sep}>Updated <time dateTime={updatedAt}>{formatDate(updatedAt)}</time></span>
            )}
            {readingTime && <span className={sep}>{readingTime} min read</span>}
          </p>
        </div>
      </Container>
    </header>
  );
}
