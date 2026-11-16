export const siteConfig = {
  name: process.env.SITE_NAME,
  url: process.env.SITE_URL,
  description: process.env.SITE_DESCRIPTION,

  organization: {
    name: process.env.ORG_NAME,
    email: process.env.ORG_EMAIL,
    phone: process.env.ORG_PHONE,
    logo: process.env.ORG_LOGO_PATH,
  },

  social: {
    linkedin: process.env.ORG_LINKEDIN,
    twitter: process.env.ORG_TWITTER,
    youtube: process.env.ORG_YOUTUBE,
  },
};