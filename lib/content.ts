// ─────────────────────────────────────────────────────────────
// CR&L @ Cornell — site content
// This is the ONLY file most board members need to edit.
// ─────────────────────────────────────────────────────────────

export const site = {
  clubEmail: "[club-email@example.com]", // TODO: replace with the club's shared email
  instagram: "https://www.instagram.com/", // TODO
  linkedin: "https://www.linkedin.com/", // TODO
  disclaimer:
    "A student-run organization of the Cornell Executive MBA program. [Confirm approved disclaimer wording with Johnson.]",
};

// Paste your Formspree endpoint here (formspree.io → New form → copy the endpoint)
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

// ── Board ────────────────────────────────────────────────────
export type BoardMember = {
  role: string;
  name: string;
  classYear: string;
  photo: string; // file in /public/images
  linkedin?: string;
};

export const board: BoardMember[] = [
  {
    role: "President",
    name: "Tiara Holmes",
    classYear: "EMBA ’27",
    photo: "/images/tiara.png",
    linkedin: undefined, // TODO: add Tiara's linkedin.com/in/... URL
  },
  {
    role: "Vice President",
    name: "Jolaade Adepoju",
    classYear: "EMBA ’27",
    photo: "/images/jolaade.jpeg",
    linkedin: undefined, // TODO: add Jolaade's public linkedin.com/in/... URL
  },
  {
    role: "Treasurer",
    name: "Lydia Booz",
    classYear: "EMBA ’27",
    photo: "/images/lydia.png",
    linkedin: "https://www.linkedin.com/in/lydiabooz/",
  },
];

// ── Next event ───────────────────────────────────────────────
export const nextEvent = {
  series: "Coming soon",
  title: "Our First Event",
  subtitle: "Speaker to be announced",
  description:
    "We’re lining up our first conversation with a leader in consumer, retail, or luxury. Join the club to be the first to hear the speaker, date, and how to RSVP.",
  date: "TBD",
  time: "TBD",
  location: "TBD",
  // When the event is confirmed: change the button to "RSVP" and link to the RSVP page.
  ctaLabel: "Get notified",
  ctaUrl: "#join",
};

// ── Board pick of the week (update weekly) ───────────────────
export const boardPick = {
  category: "Menswear",
  source: "FashionUnited",
  date: "Oct 23, 2026",
  title: "Frasers takes control of Hugo Boss",
  summary:
    "Mike Ashley’s Frasers Group crossed 50% ownership of the German tailoring house, making it a subsidiary after Boss’s board rejected Frasers’ €38-a-share takeover bid in June.",
  take: "[One or two sentences from the board on what this means for the industry.]",
  takeBy: "Tiara Holmes, EMBA ’27",
  url: "https://fashionunited.uk/news/business/frasers-takes-control-of-hugo-boss-as-stake-crosses-50/2026102591026",
};

// ── Live news feed ───────────────────────────────────────────
// RSS 2.0 feeds the site pulls automatically (refreshes every 24 hours).
// Verify each URL opens as XML in your browser before relying on it.
export type Feed = { name: string; url: string; category: string };

export const FEEDS: Feed[] = [
  { name: "Retail Dive", url: "https://www.retaildive.com/feeds/news/", category: "Retail" },
  // { name: "[Publication]", url: "[RSS URL]", category: "Luxury" },
  // { name: "[Publication]", url: "[RSS URL]", category: "Beauty" },
];

export type NewsItem = {
  category: string;
  source: string;
  date: string;
  title: string;
  dek: string;
  url: string;
};

// Shown only if every feed fails to load.
export const fallbackNews: NewsItem[] = [
  {
    category: "Luxury",
    source: "Business of Fashion",
    date: "Oct 27, 2026",
    title: "Shoppers are tiring of engineered scarcity",
    dek: "Brands are winning with products that are scarce for real reasons, like materials and craftsmanship, rather than limited drops built to sell out.",
    url: "https://www.businessoffashion.com/topics/retail/",
  },
  {
    category: "Beauty",
    source: "Retail Around The World",
    date: "Oct 23, 2026",
    title: "L’Oréal accelerates as luxury beauty recovers in China",
    dek: "Q3 revenue rose 11.9% to €11.56 billion, with like-for-like growth speeding up to 7.7%.",
    url: "https://retailslop.substack.com/p/retail-around-the-world-23-october-e9b",
  },
  {
    category: "Grocery",
    source: "Retail Around The World",
    date: "Oct 21, 2026",
    title: "Carrefour’s online sales jump 18%, but it trims its outlook",
    dek: "Like-for-like sales grew 2.3% in Q3; unrest in France disrupted stores and spending.",
    url: "https://retailslop.substack.com/p/retail-around-the-world-21-october-339",
  },
  {
    category: "Watches",
    source: "IDEX Online",
    date: "Oct 20, 2026",
    title: "Swiss watch exports rise 11.7%, led by a U.S. rebound",
    dek: "September exports hit CHF 2.2 billion. U.S. shipments nearly doubled, but mostly against a tariff-hit month a year earlier.",
    url: "https://www.idexonline.com/FullArticle?Id=51469",
  },
  {
    category: "Spirits",
    source: "Business Standard",
    date: "Oct 19, 2026",
    title: "India probes Diageo and Pernod over Scotch import duties",
    dek: "Tax officials are examining whether bulk Scotch imports were classified to qualify for lower tariffs under the India–UK trade deal.",
    url: "https://www.business-standard.com/industry/news/tax-dept-probes-pernod-diageo-scotch-imports-under-uk-trade-pact-126101901170_1.html",
  },
];
