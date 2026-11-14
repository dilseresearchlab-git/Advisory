import Link from "next/link";
import { Container } from "@/components/ui";
import CoverImage from "@/components/pages/articles/CoverImage.jsx";
import ArticleMeta, { CategoryTag } from "@/components/pages/articles/ArticleMeta";

// "Continue Reading": up to three cards. Renders nothing when there is nothing suitable.
export default function RelatedArticles({ articles }) {
  if (!articles?.length) return null;
  return (
    <section aria-labelledby="related-title" className="border-t border-line bg-ice-50">
      <Container className="py-14 sm:py-16">
        <h2 id="related-title" className="text-3xl">Continue Reading</h2>
        <p className="mt-2 text-muted">Explore more research and perspectives.</p>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <li key={a.id}>
              <Link
                href={`/articles/${a.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition duration-300 hover:border-ice-300 hover:shadow-soft"
              >
                <CoverImage article={a} aspect="aspect-[16/9]" sizes="(min-width: 1024px) 352px, (min-width: 640px) 50vw, 100vw" className="!rounded-none" />
                <div className="flex flex-1 flex-col p-5">
                  <div><CategoryTag>{a.category}</CategoryTag></div>
                  <h3 className="mt-3 text-xl leading-snug transition group-hover:text-royal">{a.title}</h3>
                  {a.excerpt && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{a.excerpt}</p>}
                  <div className="mt-auto pt-4"><ArticleMeta article={a} /></div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
