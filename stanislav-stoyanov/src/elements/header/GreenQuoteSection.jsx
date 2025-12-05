import NewsletterForm from "./NewsLetterForm";
import Quote from "./Quote";
import Hero from "./HeroSection";

const GreenQuoteSection = () => {
  return (
    <div>
      <Hero />
      <section className="relative w-full text-white -mt-150">
        <div className="bg-gradient-to-b transparent via-emerald-900/85 to-emerald-900">
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
              <Quote />
              <NewsletterForm />
            </div>
            <div className="mt-12 h-px w-full bg-gradient-to-r from-green-500/40 via-green-300/30 to-green-500/40" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default GreenQuoteSection;
