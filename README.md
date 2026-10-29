# CR&L @ Cornell — website

Next.js (App Router) + Tailwind, built to drop into v0.

## Files

```
app/layout.tsx           Fonts and page metadata
app/page.tsx             The homepage
components/MemberForm.tsx  Member interest form (sends to Formspree)
lib/content.ts           ← ALL editable content lives here
lib/feeds.ts             Pulls the live news feed from RSS
lib/fonts.ts             Playfair Display + Inter
public/images/           Crest and board headshots
```

## Bring it into v0

1. In v0, start a new chat and choose a Next.js project (Tailwind is included by default).
2. Upload or paste each file at the same path shown above. Tell v0:
   "Use these files exactly as written. Keep my existing app/globals.css import."
3. Upload the four images into `public/images/` with the same file names.
4. Preview, then deploy to Vercel from v0.

## Before launch

- **Form:** create a free form at formspree.io, copy its endpoint, and paste it into
  `FORMSPREE_ENDPOINT` in `lib/content.ts`. Until then, the form shows a "not connected" message.
- **News feed:** open each URL in `FEEDS` in your browser to confirm it shows an RSS feed,
  and add two or three more publications. The site refreshes the feed every 24 hours.
  If every feed fails, it shows the hand-picked stories in `fallbackNews`.
- **Placeholders:** search `lib/content.ts` for `[` and `TODO` — club email, social links,
  titles and companies, Tiara's and Jolaade's LinkedIn URLs, speaker details, RSVP link,
  and the disclaimer wording approved by Johnson.
- **Crest:** `badge.png` was cropped from the brand board and is low resolution.
  Replace it with the original artwork at the same file name.

## Weekly update (Board pick)

Edit the `boardPick` block in `lib/content.ts`: source, date, headline, one-line summary,
the board's "why it matters" take, who wrote it, and the link. Nothing else needs to change.

## Deploy directly to Vercel (without v0)

This folder is a complete Next.js project. Put it in a GitHub repository, then in Vercel
choose Add New → Project → Import that repository. Vercel detects Next.js automatically;
leave the build settings at their defaults. (Or run `npx vercel` inside this folder.)
