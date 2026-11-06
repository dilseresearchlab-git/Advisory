import { Section, SectionHeading, CTABand } from "@/components/ui";

import LearnHero from "@/components/pages/learn/LearnHero";
import LearningPaths from "@/components/pages/learn/LearningPaths";
import FinancialStory from "@/components/pages/learn/FinancialStory";
import FinancialStatements from "@/components/pages/learn/FinancialStatements";
import FormulaPlayground from "@/components/pages/learn/FormulaPlayground";
import InvestingMath from "@/components/pages/learn/InvestingMath";
import ReferenceSheets from "@/components/pages/learn/ReferenceSheets";

import { learningTracks } from "@/data/learning";

export const metadata = {
  title: "Learning Centre",
  description:
    "Explore financial fundamentals, company valuation, investing concepts and trading education through illustrated lessons and practical examples.",
};

export default function LearnPage() {
  return (
    <>
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
