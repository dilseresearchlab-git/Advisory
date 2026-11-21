import { generatePageMetadata } from "@/lib/seo/metadata";
import { pageSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import JsonLd from "@/components/seo/JsonLd";

import { CTABand } from "@/components/ui";

import LearnHero from "@/components/pages/learn/LearnHero";
import LearningPaths from "@/components/pages/learn/LearningPaths";
import FinancialStory from "@/components/pages/learn/FinancialStory";
import FinancialStatements from "@/components/pages/learn/FinancialStatements";
import FormulaPlayground from "@/components/pages/learn/FormulaPlayground";
import InvestingMath from "@/components/pages/learn/InvestingMath";
import ReferenceSheets from "@/components/pages/learn/ReferenceSheets";

import { learningTracks } from "@/data/learning";

export const metadata = generatePageMetadata({
  title: "Stock Market Learning Centre & Investing Basics",
  description:
    "Learn financial fundamentals, company financial statements, valuation concepts and investing mathematics through illustrated lessons, practical formulas and reference guides.",
  path: "/learn",
});

export default function LearnPage() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          path: "/learn",
          name: "Stock Market Learning Centre & Investing Basics",
          description:
            "Explore structured learning paths covering financial fundamentals, company financial statements, valuation concepts, investing mathematics and practical reference guides.",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Learning Centre", path: "/learn" },
        ])}
      />

      {/* 01 — Learning centre hero */}
      <LearnHero />

      {/* 02 — Learning paths */}
      <LearningPaths tracks={learningTracks} />

      {/* 03 — Illustrated financial fundamentals */}
      <FinancialStory />

      <FinancialStatements />

      <FormulaPlayground />

      <InvestingMath />

      <ReferenceSheets />

      <CTABand />
    </>
  );
}
