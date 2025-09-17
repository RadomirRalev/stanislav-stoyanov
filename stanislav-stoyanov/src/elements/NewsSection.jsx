import { newsItems } from "./data/news";

export default function NewsSection() {
  const [lead, ...rest] = newsItems;
  const secondaryItems = rest.slice(0, 4);
  const leadSentenceRaw = lead?.excerpt?.split(".")[0]?.trim();
  const leadBlurb = leadSentenceRaw
    ? leadSentenceRaw.endsWith(".")
      ? leadSentenceRaw
      : `${leadSentenceRaw}.`
    : null;

  return (
    <section
      id="news"
      className="bg-gradient-to-b from-white via-emerald-50 to-emerald-100 py-16"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <header className="max-w-2xl text-green-900">
          <h2 className="text-3xl font-bold uppercase tracking-wide md:text-4xl">
            Latest News
          </h2>
          <p className="mt-3 text-lg text-green-800/80 md:text-xl">
            Brief intro copy...
          </p>
        </header>

        {lead && (
          <a
            href={lead.url}
            className="group relative mt-10 block overflow-hidden bg-gray-900 shadow-2xl"
          >
            <img
              src={lead.imageSrc}
              alt={lead.imageAlt}
              className="h-96 w-full object-cover transition duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-8 text-white">
              <time className="text-xs font-semibold uppercase tracking-[0.4em] text-green-200/80">
                {lead.date}
              </time>
              <h3 className="mt-3 text-3xl font-semibold">
                {lead.title}
              </h3>
              {leadBlurb && (
                <p className="mt-4 text-base text-green-100/90">
                  {leadBlurb}
                </p>
              )}
            </div>
          </a>
        )}

        {secondaryItems.length > 0 && (
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {secondaryItems.map((item) => (
              <a
                key={`${item.id}-${item.title}`}
                href={item.url}
                className="group relative block overflow-hidden bg-gray-900 shadow-xl"
              >
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  className="h-72 w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent p-6 text-white">
                  <time className="text-xs font-semibold uppercase tracking-[0.4em] text-green-200/80">
                    {item.date}
                  </time>
                  <h3 className="mt-3 text-2xl font-semibold">
                    {item.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
