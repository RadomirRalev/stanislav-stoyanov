import leadQuoteData from "../../generated/leadQuote.json";

const fallback = {
  heroQuote: "…",
  position: "…",
};

const { item = {} } = leadQuoteData ?? {};
const defaults = { ...fallback, ...item };
const author = "Станислав Стоянов";

const Quote = () => {
  return (
    <div>
      <blockquote className="relative text-2xl md:text-3xl font-sans leading-snug">
        <span
          className="absolute -left-4 -top-8 text-7xl font-sans text-emerald-200 select-none"
          aria-hidden="true"
        >
          “
        </span>
        {item.heroQuote ?? defaults.heroQuote}
      </blockquote>

      <div className="mt-6 text-emerald-200">
        <div className="font-sans text-xl font-bold uppercase tracking-wide">
          {author}
        </div>
        <div className="text-sm md:text-base opacity-90">
          {item.position ?? defaults.position}
        </div>
      </div>
    </div>
  );
};

export default Quote;
