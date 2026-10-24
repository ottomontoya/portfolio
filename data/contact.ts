const contactHeadingLines = ["What’s your", "next question?"] as const;

export const CONTACT = {
  name: "Otto Montoya",
  role: "Data Analyst",
  tagline: "Business intelligence, built end to end.",
  location: "Mérida, México",
  portfolioUrl: "https://ottomontoya.com",
  email: "work@ottomontoya.com",
  linkedInUrl: "https://www.linkedin.com/in/ottomontoya/",
  contactEyebrow: "Start a conversation",
  contactHeading: contactHeadingLines.join(" "),
  contactHeadingLines,
  contactBody: "A new role. A complex reporting problem. A decision that needs better data. I’d like to hear about it.",
  footerEyebrow: "Keep exploring",
  footerRole: "Data Analyst / BI",
  emailAction: "Email me",
  linkedInLabel: "LinkedIn",
  backToTopLabel: "Back to top",
  copyEmailLabel: "Copy email address",
  copyEmailShortLabel: "Copy email",
  copyEmailSuccess: "Email copied",
  copyEmailError: "Copy unavailable. Select the address or open your email app.",
} as const;
