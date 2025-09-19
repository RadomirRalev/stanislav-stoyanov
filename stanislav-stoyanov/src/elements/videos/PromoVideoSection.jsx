import { useEffect } from "react";
import { useAnimate } from "motion/react";

const PromoVideoSection = ({
  title = "A Plan That Works For Everyone",
  blurb = "Watch this short message outlining our priorities for safer neighborhoods, better schools, and a stronger local economy.",
  youtubeId = "dQw4w9WgXcQ",   // replace with your promo video ID
  fullUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
}) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    // subtle slide-up on mount
    animate(
      scope.current,
      { opacity: [0, 1], transform: ["translateY(24px)", "translateY(0px)"] },
      { duration: 0.9, easing: "ease-out" }
    );
  }, [animate, scope]);

  return (
    <section
      ref={scope}
      className="
        w-full
        bg-stone-50            /* swap to bg-slate-950 for dark style */
        text-green-900         /* swap to text-white if using dark bg */
      "
    >
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Header */}
        <div className="max-w-3xl">
          <h2 className="font-sans text-3xl md:text-4xl font-bold uppercase tracking-wide">
            {title}
          </h2>
          <p className="mt-4 text-lg md:text-xl opacity-90">
            {blurb}
          </p>
        </div>

        {/* Video */}
        <div className="mt-8 overflow-hidden rounded-xl ring-1 ring-green-900/10 bg-white">
          <div className="aspect-video">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title="Promotional video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="h-px flex-1 bg-gradient-to-r from-green-500/30 via-green-400/20 to-transparent" />
          <a
            href={fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-green-900 px-5 py-3 text-base font-semibold text-white hover:bg-green-800"
          >
            Watch full video on YouTube
          </a>
        </div>
      </div>
    </section>
  );
};

export default PromoVideoSection;
