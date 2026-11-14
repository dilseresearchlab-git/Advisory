export const ARTICLES_LIST_QUERY = `
  *[
    _type == "article" &&
    !(_id in path("drafts.**")) &&
    defined(slug.current) &&
    publishedAt <= now()
  ]
  | order(featured desc, publishedAt desc) {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    excerpt,
    "coverImageUrl": coverImage.asset->url,
    "coverImageAlt": coverImage.alt,
    "coverImageCaption": coverImage.caption,
    "category": category->{ title, "slug": slug.current },
    "author": author->{ name },
    publishedAt,
    updatedAt,
    readingTime,
    featured,
    tags
  }
`;