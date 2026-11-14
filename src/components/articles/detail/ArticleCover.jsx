import Image from "next/image";
import { Container } from "@/components/ui";
import CoverImage from "@/components/pages/articles/CoverImage.jsx";
import { imageUrl, focalPosition } from "@/lib/sanityImage";

// Wide 16:9 cover at container width. Uses the CMS crop + hotspot. With no image it
// shows the neutral generated illustration, never unrelated stock imagery.
export default function ArticleCover({ cover, category, title }) {
  const src = cover ? imageUrl(cover, { width: 1800 }) : null;
  return (
    <Container className="pt-10 sm:pt-12">
      <figure>
        {src ? (
          <div className="relative aspect-video overflow-hidden rounded-lg bg-ice-100">
            <Image
              src={src}
              alt={cover.alt || ""}
              fill
              priority
              sizes="(min-width: 1152px) 1088px, 100vw"
              className="object-cover"
              style={{ objectPosition: focalPosition(cover) }}
            />
          </div>
        ) : (
          <CoverImage article={{ category, coverUrl: null, coverAlt: title }} aspect="aspect-video" sizes="100vw" />
        )}
        {src && cover.caption && <figcaption className="mt-3 text-sm text-steel">{cover.caption}</figcaption>}
      </figure>
    </Container>
  );
}
