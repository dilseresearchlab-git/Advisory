// Self-contained Portable Text renderer (no extra dependency).
// Handles blocks (normal/h2-h4/blockquote), marks (strong, em, underline, code, link),
// nested bullet/number lists and the custom objects in PortableTextBlocks.

import { Fragment } from "react";
import Link from "next/link";
import { blockKey, safeHref } from "@/lib/portableText";
import {
  KeyTakeaways, MetricHighlights, ArticleTable, Checklist, ProsCons,
  Callout, Faq, RelatedLinks, Divider, BodyImage,
} from "./PortableTextBlocks";

const linkClass =
  "text-royal underline decoration-ice-300 underline-offset-4 transition hover:decoration-royal";

function SmartLink({ href, children }) {
  const safe = safeHref(href);
  if (!safe) return <>{children}</>;
  if (safe.startsWith("/")) return <Link href={safe} className={linkClass}>{children}</Link>;
  if (safe.startsWith("#") || /^(mailto:|tel:)/i.test(safe)) return <a href={safe} className={linkClass}>{children}</a>;
  return <a href={safe} className={linkClass} target="_blank" rel="noopener noreferrer">{children}</a>;
}

function withLineBreaks(t) {
  const parts = String(t ?? "").split("\n");
  return parts.map((s, i) => (
    <Fragment key={i}>{i > 0 && <br />}{s}</Fragment>
  ));
}

function Spans({ block }) {
  const defs = Object.fromEntries((block.markDefs || []).map((d) => [d._key, d]));
  return (block.children || []).map((child, i) => {
    if (child._type !== "span") return null;
    let node = withLineBreaks(child.text);
    for (const m of child.marks || []) {
      const def = defs[m];
      if (def?._type === "link") node = <SmartLink href={def.href}>{node}</SmartLink>;
      else if (m === "strong") node = <strong className="font-semibold text-ink">{node}</strong>;
      else if (m === "em") node = <em>{node}</em>;
      else if (m === "underline") node = <u className="underline-offset-4">{node}</u>;
      else if (m === "code") node = <code className="rounded bg-ice-100 px-1.5 py-0.5 text-[0.9em] text-navy">{node}</code>;
    }
    return <Fragment key={child._key || i}>{node}</Fragment>;
  });
}

// Group consecutive list blocks into (possibly nested) list nodes.
export function groupLists(blocks) {
  const out = [];
  let i = 0;
  while (i < blocks.length) {
    if (!blocks[i].block.listItem) { out.push(blocks[i]); i++; continue; }
    let j = i;
    while (j < blocks.length && blocks[j].block.listItem) j++;
    out.push(...nestRun(blocks.slice(i, j)));
    i = j;
  }
  return out;
}

function nestRun(run) {
  const roots = [];
  let stack = [];
  const baseLevel = run[0].block.level || 1;
  for (const entry of run) {
    const b = entry.block;
    const level = b.level || 1;
    if (!stack.length || (level <= baseLevel && stack[0].listItem !== b.listItem)) {
      const root = { list: true, listItem: b.listItem, level: baseLevel, items: [] };
      roots.push(root);
      stack = [root];
    }
    while (stack.length > 1 && stack[stack.length - 1].level > level) stack.pop();
    let cur = stack[stack.length - 1];
    if (level > cur.level && cur.items.length) {
      const nested = { list: true, listItem: b.listItem, level, items: [] };
      cur.items[cur.items.length - 1].children.push(nested);
      stack.push(nested);
      cur = nested;
    }
    cur.items.push({ entry, children: [] });
  }
  return roots;
}

function ListNode({ node }) {
  const Tag = node.listItem === "number" ? "ol" : "ul";
  const cls =
    node.listItem === "number"
      ? "list-decimal marker:font-semibold marker:text-royal"
      : "list-disc marker:text-royal";
  return (
    <Tag className={`${node.level > 1 ? "mt-2" : "mt-6"} ${cls} space-y-2 pl-6 text-[17px] leading-[1.8] text-ink`}>
      {node.items.map((it, i) => (
        <li key={it.entry.block._key || i} className="pl-1">
          <Spans block={it.entry.block} />
          {it.children.map((c, ci) => <ListNode key={ci} node={c} />)}
        </li>
      ))}
    </Tag>
  );
}

function TextBlock({ block, id, index }) {
  switch (block.style) {
    case "h2":
      return <h2 id={id} className="mt-14 scroll-mt-24 text-3xl leading-tight sm:text-[2rem]"><Spans block={block} /></h2>;
    case "h3":
      return <h3 id={id} className="mt-10 scroll-mt-24 text-2xl leading-snug"><Spans block={block} /></h3>;
    case "h4":
      return <h4 className="mt-8 font-serif text-xl leading-snug text-midnight"><Spans block={block} /></h4>;
    case "blockquote":
      return (
        <blockquote className="my-10 border-l-2 border-royal pl-6 font-serif text-2xl italic leading-snug text-navy">
          <Spans block={block} />
        </blockquote>
      );
    default:
      return <p className="mt-6 text-[17px] leading-[1.8] text-ink"><Spans block={block} /></p>;
  }
}

// Rich text for nested content (callouts, FAQ answers): text blocks and lists only.
function renderRich(blocks) {
  const entries = groupLists((blocks || []).map((block, index) => ({ block, index })));
  return entries.map((e, i) =>
    e.list ? (
      <ListNode key={i} node={e} />
    ) : e.block._type === "block" ? (
      <p key={e.block._key || i} className="mt-3 first:mt-0"><Spans block={e.block} /></p>
    ) : null
  );
}

export default function ArticlePortableText({ value = [], ids = {} }) {
  const entries = groupLists(value.map((block, index) => ({ block, index })));
  return entries.map((e, i) => {
    if (e.list) return <ListNode key={`l${i}`} node={e} />;
    const { block, index } = e;
    const key = block._key || `n${index}`;
    switch (block._type) {
      case "block":
        return <TextBlock key={key} block={block} id={ids[blockKey(block, index)]} index={index} />;
      case "image":
        return <BodyImage key={key} value={block} />;
      case "keyTakeaways":
        return <KeyTakeaways key={key} value={block} />;
      case "metricHighlights":
        return <MetricHighlights key={key} value={block} />;
      case "table":
        return <ArticleTable key={key} value={block} />;
      case "checklist":
        return <Checklist key={key} value={block} />;
      case "prosCons":
        return <ProsCons key={key} value={block} />;
      case "callout":
        return <Callout key={key} value={block} renderRich={renderRich} />;
      case "faq":
        return <Faq key={key} value={block} renderRich={renderRich} />;
      case "relatedArticles":
        return <RelatedLinks key={key} value={block} />;
      case "divider":
        return <Divider key={key} />;
      default:
        return null; // unknown object types are skipped, never guessed
    }
  });
}
