import Link from "next/link";
import { regulatory } from "@/data/site";

// Reuses the site's approved status line (src/data/site.js) and the footer's risk wording.
export default function ArticleDisclaimer() {
  return (
    <aside className="mt-10 rounded-lg border border-line bg-ice-50 px-5 py-4 text-xs leading-relaxed text-steel-dark">
      <strong className="font-semibold text-navy">Important: </strong>
      {regulatory.statusLine} Investments in securities markets are subject to market risks, including the possible loss of principal.{" "}
      <Link href="/disclosures" className="text-royal underline underline-offset-2">Read our disclosures</Link>.
    </aside>
  );
}
