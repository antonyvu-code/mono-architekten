"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/i18n";

const field =
  "w-full border-b border-line bg-transparent py-3 text-[0.9375rem] transition-colors placeholder:text-stone focus:border-ink focus:outline-none";

export default function ContactForm({ t }: { t: Dictionary["contact"] }) {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // concept project: no backend — acknowledge locally
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} noValidate={false}>
      <div className="flex flex-col gap-8">
        <div>
          <label htmlFor="name" className="mono-label-xs mb-2 block text-stone-deep">
            {t.name}
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="email" className="mono-label-xs mb-2 block text-stone-deep">
            {t.email}
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={field} />
        </div>
        <div>
          <label htmlFor="message" className="mono-label-xs mb-2 block text-stone-deep">
            {t.message}
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder={t.messagePlaceholder}
            className={`${field} resize-y`}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={sent}
        className="mono-label mt-10 border border-ink px-7 py-3.5 transition-colors hover:bg-ink hover:text-paper disabled:cursor-default disabled:border-line disabled:text-stone"
      >
        {t.submit}
      </button>

      <p role="status" aria-live="polite" className="mono-label-xs mt-6 min-h-5 text-stone-deep">
        {sent ? t.success : ""}
      </p>
    </form>
  );
}
