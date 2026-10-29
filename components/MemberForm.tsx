"use client";

import { useState } from "react";
import { FORMSPREE_ENDPOINT } from "@/lib/content";
import { display } from "@/lib/fonts";

const INTERESTS = [
  "Luxury & fashion",
  "Menswear & sneakers",
  "Watches & jewelry",
  "Beauty",
  "Wine, spirits & hospitality",
  "Consumer packaged goods",
  "Grocery & food",
  "Specialty retail",
  "E-commerce",
  "Consumer investing (PE/VC)",
];

const GOALS = ["Networking", "Career pivot support", "Speaker events", "Treks & site visits", "Leading something"];

const label = "block text-xs font-semibold tracking-[0.15em] uppercase mb-2";
const input =
  "w-full border border-[#BDB5A6] bg-white px-4 py-3 text-base text-[#0B0B0B] focus:outline-none focus:border-[#B31B1B] focus:ring-1 focus:ring-[#B31B1B]";
const errorText = "mt-1.5 text-sm text-[#B31B1B]";

type Errors = Partial<Record<"name" | "email" | "role", string>>;

export default function MemberForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const next: Errors = {};
    if (!String(data.get("name") || "").trim()) next.name = "Enter your full name.";
    const email = String(data.get("email") || "").trim();
    if (!email) next.email = "Enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter an email like name@example.com.";
    if (!String(data.get("role") || "").trim()) next.role = "Enter your current title and company.";
    setErrors(next);
    if (Object.keys(next).length) return;

    if (FORMSPREE_ENDPOINT.includes("YOUR_FORM_ID")) {
      setStatus("error");
      setMessage("This form isn’t connected yet. Add the Formspree endpoint in lib/content.ts.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Your form didn’t send. Check your connection and try again.");
    }
  }

  if (status === "done") {
    return (
      <div className="border border-[#D9D2C3] bg-white p-10" role="status">
        <p className={`${display.className} text-3xl leading-tight`}>Welcome to CR&amp;L.</p>
        <p className="mt-3 text-lg text-[#3D3F3F]">Watch your inbox for our next event.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="border border-[#D9D2C3] bg-white p-6 sm:p-10 flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Full name</label>
          <input id="name" name="name" autoComplete="name" className={input} aria-invalid={!!errors.name} />
          {errors.name && <p className={errorText}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className={label}>Email</label>
          <input id="email" name="email" type="email" autoComplete="email" className={input} aria-invalid={!!errors.email} aria-describedby="email-help" />
          <p id="email-help" className="mt-1.5 text-sm text-[#5A5C5C]">The inbox you actually check</p>
          {errors.email && <p className={errorText}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="classYear" className={label}>Class year</label>
          <select id="classYear" name="classYear" className={input} defaultValue="2027">
            <option>2026</option>
            <option>2027</option>
            <option>2028</option>
          </select>
        </div>
        <div>
          <label htmlFor="cohort" className={label}>EMBA program or cohort</label>
          <input id="cohort" name="cohort" className={input} />
        </div>
        <div>
          <label htmlFor="role" className={label}>Current title and company</label>
          <input id="role" name="role" autoComplete="organization-title" className={input} aria-invalid={!!errors.role} />
          {errors.role && <p className={errorText}>{errors.role}</p>}
        </div>
        <div>
          <label htmlFor="linkedin" className={label}>LinkedIn URL (optional)</label>
          <input id="linkedin" name="linkedin" type="url" placeholder="linkedin.com/in/..." className={input} />
        </div>
      </div>

      <fieldset>
        <legend className={label}>Areas of interest</legend>
        <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {INTERESTS.map((i) => (
            <label key={i} className="flex items-center gap-3 py-1.5 cursor-pointer">
              <input type="checkbox" name="interests" value={i} className="h-5 w-5 accent-[#B31B1B]" />
              <span>{i}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={label}>What do you want from the club?</legend>
        <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {GOALS.map((g) => (
            <label key={g} className="flex items-center gap-3 py-1.5 cursor-pointer">
              <input type="checkbox" name="goals" value={g} className="h-5 w-5 accent-[#B31B1B]" />
              <span>{g}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={label}>Interested in helping run an event or committee?</legend>
        <div className="flex flex-wrap gap-6">
          {["Yes", "Maybe", "No"].map((o) => (
            <label key={o} className="flex items-center gap-3 py-1.5 cursor-pointer">
              <input type="radio" name="volunteer" value={o} className="h-5 w-5 accent-[#B31B1B]" />
              <span>{o}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="notes" className={label}>Anything else we should know? (optional)</label>
        <textarea id="notes" name="notes" rows={4} className={input} />
      </div>

      {status === "error" && (
        <p className="border-l-2 border-[#B31B1B] pl-4 text-[#B31B1B]" role="alert">{message}</p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="min-h-[48px] bg-[#B31B1B] px-8 py-3 text-sm font-semibold tracking-[0.15em] uppercase text-white hover:bg-[#8F1515] disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B0B0B]"
        >
          {status === "sending" ? "Sending…" : "Join the club"}
        </button>
        <p className="text-sm text-[#5A5C5C]">Used only for club communications; never shared.</p>
      </div>
    </form>
  );
}
