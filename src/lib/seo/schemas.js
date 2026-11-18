import { siteConfig } from "@/config/site";

const absoluteUrl = (path = "") =>
  new URL(path, siteConfig.url).toString();

const organizationId = absoluteUrl("/#organization");
const websiteId = absoluteUrl("/#website");

export function organizationSchema() {
  const org = siteConfig.organization;

  return {
    "@type": "Organization",
    "@id": organizationId,
    name: org.name,
    url: siteConfig.url,

    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(org.logo),
    },

    ...(org.email && { email: org.email }),
    ...(org.phone && { telephone: org.phone }),

    ...(siteConfig.social.length > 0 && {
      sameAs: siteConfig.social,
    }),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: {
      "@id": organizationId,
    },
    inLanguage: "en-IN",
  };
}

export function webpageSchema({
  path,
  name,
  description,
  type = "WebPage",
  image,
}) {
  const url = absoluteUrl(path);

  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,

    isPartOf: {
      "@id": websiteId,
    },

    publisher: {
      "@id": organizationId,
    },

    ...(image && {
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: absoluteUrl(image),
      },
    }),

    inLanguage: "en-IN",
  };
}

export function globalSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      websiteSchema(),
    ],
  };
}

export function pageSchema(page) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      webpageSchema(page),
    ],
  };
}


export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
