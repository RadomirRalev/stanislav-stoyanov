import { Link } from 'react-router-dom';
import { newsItems } from "../data/news";

const resolveImageSrc = (src) => {
  if (!src) return "";
  if (/^https?:\/\//i.test(src)) return src;
  const normalized = src.replace(/^\/+/, "");
  const withoutPublic = normalized.startsWith("public/")
    ? normalized.slice("public/".length)
    : normalized;
  return `${import.meta.env.BASE_URL}${withoutPublic}`;
};

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
        <div className="flex justify-end mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-3 border border-emerald-300 bg-white px-6 py-3 text-lg font-semibold text-emerald-900 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <span aria-hidden="true" className="text-xl leading-none text-emerald-500">&larr;</span>
            <span>Към началото</span>
          </Link>
        </div>

        {lead && (
          <Link
            to={`/news/${lead.slug}`}
            className="group relative mt-10 block overflow-hidden bg-gray-900 shadow-2xl"
          >
            <img
              src={resolveImageSrc(lead.imageSrc)}
              alt={lead.imageAlt}
              className="h-96 w-full object-cover object-top transition duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-8 text-white">
              <time className="text-xs font-semibold uppercase tracking-[0.4em] text-green-200/80">
                {lead.date}
              </time>
              <h3 className="mt-3 text-3xl font-semibold">{lead.title}</h3>
              {leadBlurb && (
                <p className="mt-4 text-base text-green-100/90">{leadBlurb}</p>
              )}
            </div>
          </Link>
        )}

        {secondaryItems.length > 0 && (
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {secondaryItems.map((item) => (
              <Link
                key={`${item.id}-${item.title}`}
                to={`/news/${item.slug}`}
                className="group relative block overflow-hidden bg-gray-900 shadow-xl"
              >
                <img
                  src={resolveImageSrc(item.imageSrc)}
                  alt={item.imageAlt}
                  className="h-72 w-full object-cover object-top transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent p-6 text-white">
                  <time className="text-xs font-semibold uppercase tracking-[0.4em] text-green-200/80">
                    {item.date}
                  </time>
                  <h3 className="mt-3 text-2xl font-semibold">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}



