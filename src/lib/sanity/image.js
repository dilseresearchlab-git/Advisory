import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";

const builder = imageUrlBuilder(sanityClient);

export function getSanityImage(source, width = 1200) {
  if (!source) return null;

  if (source.asset?.url) {
    return source.asset.url;
  }

  return builder
    .image(source)
    .width(width)
    .auto("format")
    .fit("crop")
    .url();
}