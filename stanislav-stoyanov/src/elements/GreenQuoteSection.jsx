import NewsletterForm from "./NewsLetterForm";

const GreenQuoteSection = ({
  quote = "Лорем ипсум долор сит амет, консектетур адиписинг елит, сед до еиусмод темпор инцидиунт ут лаборе ет долоре магна аликуа. Ут еним ад миним вениам, кис ноструд екзертитацион уламко лаборис ниси ут аликвип екс еа комодо консекуат.",
  author = "Станислав Стоянов",
  role = "Председател на ЕСН",
  youtubeId = "dQw4w9WgXcQ", // replace with your real video id
  fullUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
}) => {
  return (
    <section className="relative w-full text-white -mt-150"> 
      {/* -mt-16 pulls the green block up over the hero */}
      <div className="bg-gradient-to-b transparent via-green-900/85 to-green-900">
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
                  className="absolute -left-4 -top-8 text-7xl font-serif text-green-300/30 select-none"
                  aria-hidden="true"
                >
                  “
                </span>
                {quote}
              </blockquote>

              <div className="mt-6 text-green-100">
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

            {/* Video */}
            {/* <div className="overflow-hidden rounded-lg ring-1 ring-white/20 bg-black/20"> */}
            <NewsletterForm></NewsletterForm>
              {/* <div className="aspect-video">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title="Campaign video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div> */}

              {/* Desktop CTA under video */}
              {/* <div className="hidden md:flex items-center justify-between px-4 py-3">
                <span className="text-sm text-green-100/90">Short clip</span>
                <a
                  href={fullUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/20"
                >
                  Watch full video on YouTube
                </a>
              </div> */}
            {/* </div> */}
          </div>

          {/* Subtle bottom divider */}
          <div className="mt-12 h-px w-full bg-gradient-to-r from-green-500/40 via-green-300/30 to-green-500/40" />
        </div>
      </div>
    </section>
  );
};

export default GreenQuoteSection;