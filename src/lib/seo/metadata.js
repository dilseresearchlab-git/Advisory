import { siteConfig } from "@/config/site";

export function generatePageMetadata({
  title,
  description,
  path = "/",
  image,
  type = "website",
  index = true,
}) {
  const url = new URL(path, siteConfig.url).toString();

  // Accept either a relative image path or an absolute URL.
  const imageUrl = image
    ? new URL(image, siteConfig.url).toString()
    : undefined;

  return {
    title,
    description,

    alternates: {
      canonical: url,
    },

    robots: {
      index,
      follow: true,
      googleBot: {
        index,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    openGraph: {
      type,
      url,
      siteName: siteConfig.name,
      title,
      description,
      locale: "en_IN",
      ...(imageUrl && {
        images: [
          {
            url: imageUrl,
            alt: `${siteConfig.name} – ${title}`,
          },
        ],
      }),
    },

    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      ...(imageUrl && {
        images: [imageUrl],
      }),
    },
  };
}