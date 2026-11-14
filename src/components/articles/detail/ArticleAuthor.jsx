import Image from "next/image";
import { imageUrl } from "@/lib/sanityImage";

export default function ArticleAuthor({ author }) {
  if (!author?.name) return null;
  const photo = author.image ? imageUrl(author.image, { width: 160, height: 160, focal: true }) : null;
  const initials = author.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <section aria-label="About the author" className="mt-14 flex items-start gap-4 border-t border-line pt-8">
      {photo ? (
        <Image src={photo} alt={author.image.alt || author.name} width={64} height={64} className="h-12 w-12 md:h-16 md:w-16 shrink-0 rounded-full object-cover" />
      ) : (
        <span className="flex h-10 w-10 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-full bg-navy font-serif text-xl text-ice-200" aria-hidden="true">{initials}</span>
      )}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-royal">Written by</p>
        <p className="mt-1 font-serif text-xl text-midnight">{author.name}</p>
        {author.bio && <p className="mt-2 text-[15px] leading-relaxed text-muted">{author.bio}</p>}
      </div>
    </section>
  );
}
