// ─────────────────────────────────────────────────────────────
// SITE CONFIG — edit branding, contact details and nav here.
// "Meridian Research & Advisory" is a PLACEHOLDER name.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Meridian",
  fullName: "Meridian Research & Advisory",
  tagline: "Disciplined research for serious market participants",
  description:
    "Independent equity research, structured market perspectives and decision tools for investors and traders in India.",
  // Placeholder contact details — replace before publishing.
  contact: {
    email: "hello@example.com",
    phone: "+91 00000 00000",
    address: "Office address line, City, State, PIN (placeholder)",
    hours: "Mon–Fri, 9:30 AM – 6:00 PM IST",
  },
  social: {
    linkedin: "#",
    x: "#",
    youtube: "#",
  },
};

// Regulatory status. Flip `advisoryActive` to true ONLY after the
// applicable registration is obtained and legal counsel has approved
// all service descriptions, fees and disclosures.
export const regulatory = {
  advisoryActive: false,
  statusLine:
    "Meridian is not currently registered with SEBI as an investment adviser or research analyst. Content on this website is for general information and education only.",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/advisory", label: "Advisory" },
  { href: "/pricing", label: "Pricing" },
  { href: "/research", label: "Research" },
  { href: "/tools", label: "Tools" },
  { href: "/learn", label: "Learn" },
  { href: "/about", label: "About" },
];

export const footerLinks = {
  Company: [
    { href: "/about", label: "About & Methodology" },
    { href: "/research", label: "Research & Insights" },
    { href: "/contact", label: "Contact" },
  ],
  Services: [
    { href: "/advisory", label: "Advisory Services" },
    { href: "/pricing", label: "Packages & Pricing" },
    { href: "/tools", label: "Tools & Calculators" },
    { href: "/learn", label: "Learning Centre" },
  ],
  Legal: [
    { href: "/disclosures", label: "Disclosures" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Use" },
  ],
};
