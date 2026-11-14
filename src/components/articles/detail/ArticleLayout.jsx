import { Container } from "@/components/ui";
import ArticleTOC from "./ArticleTOC";
import ShareControls from "./ShareControls";

// Two-column reading layout: sticky sidebar (TOC + share) and a 760px reading column.
// On mobile the sidebar disappears; the TOC collapses above the article and share sits below it.
export default function ArticleLayout({ headings, title, canonical, children }) {
  return (
    <Container className="py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-8">
            <ArticleTOC headings={headings} variant="desktop" />
            <ShareControls title={title} canonical={canonical} />
          </div>
        </aside>

        <div className="min-w-0 max-w-[760px]">
          <ArticleTOC headings={headings} variant="mobile" />
          <div id="article-body">{children}</div>
          <ShareControls title={title} canonical={canonical} className="mt-12 border-t border-line pt-8 lg:hidden" />
        </div>
      </div>
    </Container>
  );
}
