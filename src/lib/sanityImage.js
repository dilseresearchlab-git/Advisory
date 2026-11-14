// Sanity image helpers (no extra dependency). Expects image objects projected in GROQ as:
//   { alt, caption, hotspot, crop, asset->{ url, metadata{ dimensions } } }
// Honours the editor's crop (via CDN `rect`) and hotspot (via object-position).

const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

function cropRect(img) {
  const dims = img?.asset?.metadata?.dimensions;
  const c = img?.crop;
  if (!dims) return null;
  if (!c) return { x: 0, y: 0, w: dims.width, h: dims.height, cropped: false };
  const x = Math.round(c.left * dims.width);
  const y = Math.round(c.top * dims.height);
  const w = Math.round((1 - c.left - c.right) * dims.width);
  const h = Math.round((1 - c.top - c.bottom) * dims.height);
  return { x, y, w, h, cropped: true };
}

export function imageUrl(img, { width = 1600, height, focal = false } = {}) {
  const url = img?.asset?.url;
  if (!url) return null;
  const q = [];
  const r = cropRect(img);
  if (r?.cropped) q.push(`rect=${r.x},${r.y},${r.w},${r.h}`);
  q.push(`w=${width}`);
  if (height) {
    q.push(`h=${height}`, "fit=crop");
    if (focal && img.hotspot) q.push("crop=focalpoint", `fp-x=${img.hotspot.x.toFixed(3)}`, `fp-y=${img.hotspot.y.toFixed(3)}`);
  }
  q.push("auto=format");
  return `${url}?${q.join("&")}`;
}

// Intrinsic size after the editor's crop, for next/image width/height.
export function imageSize(img) {
  const r = cropRect(img);
  return r ? { width: r.w, height: r.h } : null;
}

// CSS object-position that keeps the hotspot in frame when the image is cover-cropped.
export function focalPosition(img) {
  const h = img?.hotspot;
  if (!h) return "50% 50%";
  const c = img.crop || { left: 0, right: 0, top: 0, bottom: 0 };
  const fx = clamp((h.x - c.left) / (1 - c.left - c.right || 1));
  const fy = clamp((h.y - c.top) / (1 - c.top - c.bottom || 1));
  return `${(fx * 100).toFixed(1)}% ${(fy * 100).toFixed(1)}%`;
}
