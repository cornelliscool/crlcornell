import Image from "next/image";
import MemberForm from "@/components/MemberForm";
import { board, boardPick, nextEvent, site } from "@/lib/content";
import { getLiveFeed } from "@/lib/feeds";
import { display } from "@/lib/fonts";

// Rebuild the page (and refresh the news feed) every 24 hours.
export const revalidate = 86400;

const RED = "#B31B1B";
const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B31B1B]";
const eyebrow = "text-xs tracking-[0.2em] uppercase";
const wrap = "mx-auto w-full max-w-[1280px] px-6 sm:px-8";

function Wordmark({ dark = false, size = "sm" }: { dark?: boolean; size?: "sm" | "lg" }) {
  return (
    <span className="flex flex-col gap-0.5">
      <span className={`${display.className} font-medium leading-none tracking-tight ${size === "lg" ? "text-[44px]" : "text-[34px]"}`}>
        CR<span style={{ color: dark ? "#E8A3A3" : RED }}>&amp;</span>L{" "}
        <span className={size === "lg" ? "text-[28px]" : "text-[22px]"}>@ Cornell</span>
      </span>
      <span className={`text-[10px] tracking-[0.3em] uppercase ${dark ? "text-[#CFC8BA]" : ""}`}>
        Consumer, Retail &amp; Luxury Club
      </span>
    </span>
  );
}

export default async function Home() {
  const feed = await getLiveFeed(5);

  return (
    <div className="text-base leading-relaxed">
      {/* Header */}
      <header className="border-b border-[#D9D2C3]">
        <div className={`${wrap} flex flex-wrap items-center justify-between gap-5 py-5`}>
          <a href="#top" className={`no-underline ${focus}`} aria-label="CR&L @ Cornell home">
            <Wordmark />
          </a>
          <nav aria-label="Main" className="flex flex-wrap items-center gap-x-7 gap-y-3 text-[13px] tracking-[0.15em] uppercase">
            {[
              ["Board", "#board"],
              ["Events", "#events"],
              ["News", "#news"],
              ["Get involved", "#join"],
            ].map(([t, h]) => (
              <a key={h} href={h} className={`hover:text-[#B31B1B] ${focus}`}>{t}</a>
            ))}
            <a href="#join" className={`inline-flex min-h-[44px] items-center bg-[#0B0B0B] px-5 text-[#F7F3EA] hover:bg-[#B31B1B] ${focus}`}>
              Join the club
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section id="top" className={`${wrap} flex flex-wrap items-center gap-16 py-20 sm:py-24`}>
          <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-8">
            <div className={`flex items-center gap-4 ${eyebrow}`}>
              <span className="font-semibold text-[#B31B1B]">Cornell EMBA</span>
              <span className="h-px w-12 bg-[#0B0B0B]" />
              <span>A student-led club</span>
            </div>
            <h1 className={`${display.className} m-0 text-[clamp(40px,5.4vw,76px)] font-normal leading-[1.06] tracking-tight`}>
              Access to the people, careers, ideas, and institutions shaping{" "}
              <em className="text-[#B31B1B]">consumer, retail, and luxury.</em>
            </h1>
            <p className="max-w-[600px] text-lg text-[#3D3F3F]">
              For Cornell Executive MBA students — working professionals building careers across luxury, beauty,
              menswear, watches, spirits, consumer goods, and specialty retail. We bring the industry to our residencies, and our members bring it
              to each other.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#join" className={`inline-flex min-h-[48px] items-center bg-[#B31B1B] px-7 text-[13px] tracking-[0.15em] uppercase text-white hover:bg-[#8F1515] ${focus}`}>
                Become a member
              </a>
              <a href="#events" className={`inline-flex min-h-[48px] items-center border border-[#0B0B0B] px-7 text-[13px] tracking-[0.15em] uppercase hover:bg-[#0B0B0B] hover:text-[#F7F3EA] ${focus}`}>
                See upcoming events
              </a>
            </div>
          </div>
          <div className="flex flex-[1_1_320px] justify-center">
            <Image src="/images/badge.png" alt="CR&L @ Cornell crest: a bear carrying a CR&L shopping bag" width={358} height={370} priority className="h-auto w-full max-w-[400px]" />
          </div>
        </section>

        {/* Board */}
        <section id="board" aria-label="Board" className="bg-[#0B0B0B] text-[#F7F3EA]">
          <div className={`${wrap} flex flex-col gap-12 py-20`}>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="flex flex-col gap-4">
                <span className={`${eyebrow} text-[#CFC8BA]`}>Founding board</span>
                <h2 className={`${display.className} m-0 text-[44px] font-normal leading-[1.1]`}>
                  Meet the <em className="text-[#E8A3A3]">board.</em>
                </h2>
              </div>
              <p className="max-w-[420px] text-[#CFC8BA]">
                Cornell Executive MBA students leading the club’s programming, partnerships, and community.
              </p>
            </div>
            <div className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
              {board.map((m) => (
                <article key={m.name} className="flex flex-col gap-5">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#3D3F3F]">
                    <Image src={m.photo} alt={`Headshot of ${m.name}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-top" />
                  </div>
                  <div className="flex flex-col gap-1.5 border-t border-[#3D3F3F] pt-4">
                    <span className={`${eyebrow} font-semibold text-[#E8A3A3]`}>{m.role}</span>
                    <h3 className={`${display.className} m-0 text-[28px] font-medium`}>{m.name}</h3>
                    <span className="text-sm text-[#CFC8BA]">{m.classYear}</span>
                    {m.linkedin && (
                      <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className={`self-start py-2.5 text-[13px] tracking-[0.15em] uppercase underline underline-offset-4 hover:text-[#E8A3A3] ${focus}`}>
                        LinkedIn
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Next event */}
        <section id="events" className={`${wrap} flex flex-col gap-8 pt-24 pb-10`}>
          <span className={eyebrow}>Next up</span>
          <div className="flex flex-wrap border border-[#D9D2C3] bg-white">
            <div className="flex min-h-[380px] flex-[1_1_420px] flex-col justify-between gap-8 bg-[#0B0B0B] p-8 text-[#F7F3EA] sm:p-12">
              <span className={`${eyebrow} text-[11px] text-[#CFC8BA]`}>{nextEvent.series}</span>
              <div className="flex flex-col gap-3">
                <span className={`${display.className} text-[clamp(40px,5vw,56px)] font-medium uppercase leading-none tracking-tight`}>
                  {nextEvent.title}
                </span>
                <span className={`${display.className} text-[26px] italic text-[#E8A3A3]`}>{nextEvent.subtitle}</span>
              </div>
              <span className="h-0.5 w-10 bg-[#B31B1B]" />
            </div>
            <div className="flex flex-[1_1_420px] flex-col justify-center gap-7 p-8 sm:p-12">
              <p className="text-lg text-[#3D3F3F]">{nextEvent.description}</p>
              <dl className="grid grid-cols-3 gap-5 border-t border-[#D9D2C3] pt-6">
                {[
                  ["Date", nextEvent.date],
                  ["Time", nextEvent.time],
                  ["Where", nextEvent.location],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-1">
                    <dt className="text-[11px] tracking-[0.15em] uppercase text-[#5A5C5C]">{k}</dt>
                    <dd className="m-0 font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              <div>
                <a href={nextEvent.ctaUrl} className={`inline-flex min-h-[48px] items-center bg-[#B31B1B] px-7 text-[13px] tracking-[0.15em] uppercase text-white hover:bg-[#8F1515] ${focus}`}>
                  {nextEvent.ctaLabel}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* News */}
        <section id="news" aria-label="Industry news" className={`${wrap} flex flex-col gap-10 pt-16 pb-24`}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-col gap-4">
              <span className={eyebrow}>Industry news</span>
              <h2 className={`${display.className} m-0 text-[44px] font-normal leading-[1.1]`}>
                What we’re <em className="text-[#B31B1B]">reading.</em>
              </h2>
            </div>
            <p className="max-w-[420px] text-[#3D3F3F]">
              A weekly pick from the board, plus a live feed from leading consumer, retail, and luxury trade publications.
            </p>
          </div>

          {/* Board pick */}
          <article className="flex flex-wrap border border-[#D9D2C3] bg-white">
            <div className="flex min-h-[300px] flex-[1_1_360px] flex-col justify-between gap-6 bg-[#0B0B0B] p-8 text-[#F7F3EA] sm:p-10">
              <span className="self-start bg-[#B31B1B] px-3 py-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-white">
                Board pick of the week
              </span>
              <span className={`${display.className} text-[44px] leading-none`}>{boardPick.source}</span>
              <span className={`${eyebrow} text-[#CFC8BA]`}>{boardPick.category} · {boardPick.date}</span>
            </div>
            <div className="flex flex-[2_1_480px] flex-col justify-center gap-5 p-8 sm:p-10">
              <h3 className={`${display.className} m-0 text-[32px] font-medium leading-[1.15]`}>{boardPick.title}</h3>
              <p className="text-[17px] text-[#3D3F3F]">{boardPick.summary}</p>
              <div className="flex flex-col gap-1.5 border-l-2 border-[#B31B1B] pl-5">
                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#5A5C5C]">Why it matters</span>
                <p className={`${display.className} text-[19px] italic leading-snug`}>{boardPick.take}</p>
                <span className="text-sm text-[#5A5C5C]">— {boardPick.takeBy}</span>
              </div>
              <a href={boardPick.url} target="_blank" rel="noopener noreferrer" className={`self-start py-2.5 text-xs font-semibold tracking-[0.15em] uppercase text-[#B31B1B] underline underline-offset-4 ${focus}`}>
                Read the story
              </a>
            </div>
          </article>

          {/* Live feed */}
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#0B0B0B] pb-4">
              <span className={`flex items-center gap-2.5 ${eyebrow} font-semibold`}>
                <span className="h-2 w-2 rounded-full bg-[#B31B1B]" aria-hidden="true" />
                Live feed
              </span>
              <span className="text-[13px] text-[#5A5C5C]">Refreshed daily</span>
            </div>
            {feed.map((n) => (
              <a
                key={n.url}
                href={n.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-wrap items-baseline gap-x-8 gap-y-2 border-b border-[#D9D2C3] py-5 ${focus}`}
              >
                <span className="flex flex-[0_0_220px] flex-col gap-0.5">
                  <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#B31B1B]">{n.category}</span>
                  <span className="text-[13px] text-[#5A5C5C]">{n.source}{n.date ? ` · ${n.date}` : ""}</span>
                </span>
                <span className="flex flex-[1_1_420px] flex-col gap-1">
                  <span className={`${display.className} text-[22px] leading-tight group-hover:text-[#B31B1B]`}>{n.title}</span>
                  {n.dek && <span className="text-[15px] text-[#3D3F3F]">{n.dek}</span>}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Why join */}
        <section aria-label="Why join" className="border-y border-[#D9D2C3]">
          <div className={`${wrap} grid gap-12 py-20 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]`}>
            {[
              ["People", "Direct access to the executives, founders, and investors running the brands you study, and to classmates already inside them."],
              ["Careers", "Support for members pivoting into the industry or moving up within it, from brand and retail leadership to consumer-focused investing."],
              ["Ideas", "Candid conversations on pricing, distribution, AI in retail, and what separates a timeless brand from a trend."],
            ].map(([t, d]) => (
              <div key={t} className="flex flex-col gap-3 border-t-2 border-[#B31B1B] pt-5">
                <h3 className={`${display.className} m-0 text-[28px] font-medium`}>{t}</h3>
                <p className="text-[#3D3F3F]">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Get involved */}
        <section id="join" className={`${wrap} flex flex-col gap-12 py-24`}>
          <h2 className={`${display.className} m-0 text-center text-[clamp(32px,4vw,52px)] font-normal leading-[1.1]`}>
            Luxury isn’t a price point. <em className="text-[#B31B1B]">It’s a standard.</em>
          </h2>
          <div className="flex flex-wrap gap-6">
            <div className="flex min-w-0 flex-[2_1_560px] flex-col gap-5">
              <div className="flex flex-col gap-2">
                <span className={`${eyebrow} font-semibold text-[#B31B1B]`}>Students &amp; prospective students</span>
                <p className="text-lg text-[#3D3F3F]">Tell us a little about yourself. It takes about two minutes.</p>
              </div>
              <MemberForm />
            </div>
            <aside className="flex flex-[1_1_300px] flex-col items-start gap-4 self-start bg-[#0B0B0B] p-8 text-[#F7F3EA] sm:p-12">
              <span className={`${eyebrow} font-semibold text-[#E8A3A3]`}>Industry, alumni &amp; partners</span>
              <p className="text-lg text-[#E2DCCF]">
                Speaking, hosting a visit, recruiting, or sponsorship: tell us what you have in mind.
              </p>
              <a
                href={`mailto:${site.clubEmail}?subject=${encodeURIComponent("Partnering with CR&L @ Cornell")}`}
                className={`inline-flex min-h-[48px] items-center border border-[#F7F3EA] px-6 text-[13px] tracking-[0.15em] uppercase hover:bg-[#F7F3EA] hover:text-[#0B0B0B] ${focus}`}
              >
                Email the board
              </a>
            </aside>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0B0B0B] text-[#F7F3EA]">
        <div className={`${wrap} flex flex-col gap-10 pt-16 pb-10`}>
          <div className="flex flex-wrap justify-between gap-8">
            <Wordmark dark size="lg" />
            <div className="flex flex-wrap gap-7 text-[13px] tracking-[0.15em] uppercase">
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className={`hover:text-[#E8A3A3] ${focus}`}>Instagram</a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={`hover:text-[#E8A3A3] ${focus}`}>LinkedIn</a>
              <a href={`mailto:${site.clubEmail}`} className={`hover:text-[#E8A3A3] ${focus}`}>Email</a>
            </div>
          </div>
          <p className="border-t border-[#3D3F3F] pt-6 text-[13px] text-[#CFC8BA]">
            {site.disclaimer} © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
