import { CONTACT } from "./contact.ts";

export const SEO = {
  title: `${CONTACT.name} | Data Analyst & BI Specialist`,
  description: "Data analyst and BI specialist portfolio featuring end-to-end Tableau, Amazon QuickSight, SQL, data governance, and dashboard projects across six industries.",
  canonicalUrl: `${CONTACT.portfolioUrl}/`,
  locale: "en_US",
  imageUrl: `${CONTACT.portfolioUrl}/assets/og-image.png`,
  imageWidth: 1200,
  imageHeight: 630,
  imageAlt: `${CONTACT.name}, Data Analyst and BI Specialist portfolio.`,
} as const;
