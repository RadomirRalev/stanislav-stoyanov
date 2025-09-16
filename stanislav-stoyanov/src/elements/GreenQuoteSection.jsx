import NewsletterForm from "./NewsLetterForm";

const GreenQuoteSection = ({
  quote = "Лорем ипсум долор сит амет, консектетур адиписинг елит, сед до еиусмод темпор инцидиунт ут лаборе ет долоре магна аликуа. Ут еним ад миним вениам, кис ноструд екзертитацион уламко лаборис ниси ут аликвип екс еа комодо консекуат.",
  author = "Станислав Стоянов",
  role = "Председател на ЕСН",
  fullUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
}) => {
  return (
    <section className="relative w-full text-white -mt-150">
      <div className="bg-gradient-to-b transparent via-emerald-900/85 to-emerald-900">
        {/* Soft shadow glow at the top */}
        <div
          aria-hidden="true"
          className="
        absolute top-0 left-0 right-0 h-16
        bg-gradient-to-b from-black/40 via-black/20 to-transparent
        blur-md
      "
        />
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid items-center gap-10 md:grid-cols-2">
            {/* Quote */}
            <div>
              <blockquote className="relative text-2xl md:text-3xl font-serif leading-snug">
                <span
                  className="absolute -left-4 -top-8 text-7xl font-serif text-emerald-200 select-none"
                  aria-hidden="true"
                >
                  “
                </span>
                {quote}
              </blockquote>

              <div className="mt-6 text-emerald-200">
                <div className="font-serif text-xl font-bold uppercase tracking-wide">
                  {author}
                </div>
                <div className="text-sm md:text-base opacity-90">{role}</div>
              </div>

              {/* CTA under quote (mobile) */}
              <div className="mt-8 md:hidden">
                <a
                  href={fullUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-white/10 px-5 py-3 text-base font-semibold text-white ring-1 ring-white/20 hover:bg-white/20"
                >
                  Watch full video on YouTube
                </a>
              </div>
            </div>

            <NewsletterForm />
          </div>

          {/* Subtle bottom divider */}
          <div className="mt-12 h-px w-full bg-gradient-to-r from-green-500/40 via-green-300/30 to-green-500/40" />
        </div>
      </div>
    </section>
  );
};

export default GreenQuoteSection;
