import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui";
import { CategoryTag } from "@/components/pages/articles/ArticleMeta";
import CoverImage from "@/components/pages/articles/CoverImage.jsx";
import { formatDate } from "@/lib/articles";
import { imageUrl, focalPosition } from "@/lib/sanityImage";

const sep = "border-l border-line pl-4";

export default function ArticleHeader({ article }) {
  const { title, subtitle, excerpt, category, featured, author, publishedAt, updatedAt, readingTime, cover } = article;
  
  // Only show "Updated" when the editor set it and it falls on a later day than publication.
  const showUpdated = updatedAt && formatDate(updatedAt) !== formatDate(publishedAt) && new Date(updatedAt) > new Date(publishedAt);
  const src = cover ? imageUrl(cover, { width: 1800 }) : null;

  return (
    <header className="border-b border-line bg-linear-to-b from-ice-100 to-white">
      <Container className="py-8 sm:py-12">
        {/* Breadcrumb */}
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

        {/* Title, Meta & Excerpt */}
        <div className="mx-auto mt-6 max-w-3xl text-center">
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

          <h1 className="mt-4 text-3xl leading-[1.1] sm:text-4xl">{title}</h1>
          {subtitle && <p className="mt-3 font-serif text-lg italic leading-snug text-steel-dark sm:text-xl">{subtitle}</p>}
          {excerpt && <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted">{excerpt}</p>}

          <p className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-steel-dark">
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

        {/* Integrated Cover Image */}
        <div className="mx-auto mt-8 max-w-4xl">
          <figure>
            {src ? (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-ice-100 shadow-sm">
                <Image
                  src={src}
                  alt={cover.alt || ""}
                  fill
                  priority
                  sizes="(min-width: 1152px) 1024px, 100vw"
                  className="object-cover"
                  style={{ objectPosition: focalPosition(cover) }}
                />
              </div>
            ) : (
              <CoverImage article={{ category, coverUrl: null, coverAlt: title }} aspect="aspect-[16/9]" sizes="100vw" />
            )}
            {src && cover.caption && <figcaption className="mt-2.5 text-center text-xs text-steel">{cover.caption}</figcaption>}
          </figure>
        </div>
      </Container>
    </header>
  );
}