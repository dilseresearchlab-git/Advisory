
const env = (key, fallback = "") =>
  process.env[key] || fallback;

export const siteConfig = {
  name: env("SITE_NAME", "Meridian Research & Advisory"),
  url: env("SITE_URL", "https://example.com"),
  description: env(
    "SITE_DESCRIPTION",
    "Structured, evidence-led research for investors and traders in India."
  ),

  organization: {
    name: env("ORG_NAME", "Meridian Research & Advisory"),
    email: env("ORG_EMAIL"),
    phone: env("ORG_PHONE"),
    logo: env("ORG_LOGO_PATH", "/images/logo.png"),
  },

  social: [
    env("ORG_LINKEDIN"),
    env("ORG_TWITTER"),
    env("ORG_YOUTUBE"),
  ].filter(Boolean),
};
