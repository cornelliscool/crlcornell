import { FEEDS, fallbackNews, type NewsItem } from "./content";

function clean(s: string) {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#039;|&#8217;|&rsquo;/g, "’")
    .replace(/&#8216;|&lsquo;/g, "‘")
    .replace(/&#8220;|&ldquo;/g, "“")
    .replace(/&#8221;|&rdquo;/g, "”")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function pick(tag: string, xml: string) {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  return m ? clean(m[1]) : "";
}

function trim(text: string, max = 170) {
  return text.length > max ? text.slice(0, max).replace(/\s+\S*$/, "") + "…" : text;
}

// Pulls the latest items from every feed in lib/content.ts.
// Falls back to the hand-picked stories if nothing loads.
export async function getLiveFeed(limit = 5): Promise<NewsItem[]> {
  try {
    const results = await Promise.all(
      FEEDS.map(async (feed) => {
        try {
          const res = await fetch(feed.url, { next: { revalidate: 86400 } });
          if (!res.ok) return [];
          const xml = await res.text();
          return xml
            .split(/<item[\s>]/i)
            .slice(1, 11)
            .map((raw) => {
              const pubDate = pick("pubDate", raw);
              const ts = pubDate ? Date.parse(pubDate) : 0;
              return {
                category: feed.category,
                source: feed.name,
                title: pick("title", raw),
                url: pick("link", raw),
                dek: trim(pick("description", raw)),
                ts: Number.isNaN(ts) ? 0 : ts,
              };
            })
            .filter((i) => i.title && i.url.startsWith("http"));
        } catch {
          return [];
        }
      })
    );

    const merged = results
      .flat()
      .sort((a, b) => b.ts - a.ts)
      .slice(0, limit)
      .map(({ ts, ...item }) => ({
        ...item,
        date: ts
          ? new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
          : "",
      }));

    return merged.length ? merged : fallbackNews.slice(0, limit);
  } catch {
    return fallbackNews.slice(0, limit);
  }
}
