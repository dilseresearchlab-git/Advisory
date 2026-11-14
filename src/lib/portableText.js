// Portable Text helpers shared by the Table of Contents and the body renderer.
// Headings get their IDs here, ONCE, from the same body data that is rendered,
// so TOC links and heading anchors can never drift apart.

export function blockKey(block, index) {
  return block?._key || `i${index}`;
}

export function blockText(block) {
  return (block?.children || [])
    .filter((c) => c._type === "span")
    .map((c) => c.text)
    .join("");
}

export function slugify(text) {
  return (
    text
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "section"
  );
}

// Returns { headings: [{id,text,level}], ids: { [blockKey]: id } } for H2/H3 blocks.
export function buildHeadings(body = []) {
  const seen = new Map();
  const taken = new Set();
  const headings = [];
  const ids = {};
  body.forEach((b, i) => {
    if (b?._type !== "block" || (b.style !== "h2" && b.style !== "h3")) return;
    const text = blockText(b).trim();
    if (!text) return;
    const base = slugify(text);
    let n = seen.get(base) || 0;
    let id = n ? `${base}-${n + 1}` : base;
    while (taken.has(id)) id = `${base}-${++n + 1}`;
    seen.set(base, n + 1);
    taken.add(id);
    ids[blockKey(b, i)] = id;
    headings.push({ id, text, level: b.style === "h2" ? 2 : 3 });
  });
  return { headings, ids };
}

// Allow only safe link targets.
export function safeHref(href = "") {
  const h = String(href).trim();
  if (/^(https?:\/\/|mailto:|tel:)/i.test(h) || h.startsWith("/") || h.startsWith("#")) return h;
  return null;
}
