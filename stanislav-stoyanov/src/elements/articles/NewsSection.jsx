import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import newsData from "../../generated/news.json";

const resolveImageSrc = (src) => {
  if (!src) return "";
  return /^https?:\/\//i.test(src) ? src : `https:${src.replace(/^\/+/, "")}`;
};

const formatPublishedDate = (isoDate) => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  return new Intl.DateTimeFormat("bg-BG", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

const extractLeadBlurb = (article) => {
  if (!article) return null;
  const source =
    typeof article.excerpt === "string" && article.excerpt.trim()
      ? article.excerpt
      : Array.isArray(article.body)
        ? article.body.join(" ")
        : "";
  if (!source) return null;

  const [sentence] = source.split(".").map((part) => part.trim()).filter(Boolean);
  if (!sentence) return null;
  return sentence.endsWith(".") ? sentence : `${sentence}.`;
};

const NORMALIZED_ARTICLES = (Array.isArray(newsData?.items) ? newsData.items : []).map((article) => ({
  ...article,
  heroImageUrl: article.heroImage?.url ?? "",
  heroImageAlt: article.heroImage?.alt ?? "",
}));

export default function NewsSection({ showBackLink = true } = {}) {
  const lead = NORMALIZED_ARTICLES[0] ?? null;
  const secondaryItems = NORMALIZED_ARTICLES.slice(1, 5);
  const leadBlurb = extractLeadBlurb(lead);

  return (
    <>
      <section
        id="news"
        className="bg-gradient-to-b from-white via-emerald-50 to-emerald-100 py-16"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          {showBackLink && (
            <div className="mb-8 flex justify-end">
              <Link
                to="/"
                className="inline-flex items-center gap-3 border border-emerald-300 bg-white px-6 py-3 text-lg font-semibold text-emerald-900 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <span aria-hidden="true" className="text-xl leading-none text-emerald-500">
                  &larr;
                </span>
                <span>Назад към началото</span>
              </Link>
            </div>
          )}

          {lead ? (
            <>
              <Link
                to={`/news/${lead.slug}`}
                className="group relative mt-10 block overflow-hidden bg-gray-900 shadow-2xl"
              >
                {lead.heroImageUrl && (
                  <img
                    src={resolveImageSrc(lead.heroImageUrl)}
                    alt={lead.heroImageAlt}
                    className="h-96 w-full object-cover object-top transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-8 text-white">
                  <time className="text-xs font-semibold uppercase tracking-[0.4em] text-green-200/80">
                    {formatPublishedDate(lead.publishedAt)}
                  </time>
                  <h3 className="mt-3 text-3xl font-semibold">{lead.title}</h3>
                  {leadBlurb && (
                    <p className="mt-4 text-base text-green-100/90">{leadBlurb}</p>
                  )}
                </div>
              </Link>

              {secondaryItems.length > 0 && (
                <div className="mt-12 grid gap-8 md:grid-cols-2">
                  {secondaryItems.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/news/${item.slug}`}
                      className="group relative block overflow-hidden bg-gray-900 shadow-xl"
                    >
                      {item.heroImageUrl ? (
                        <img
                          src={resolveImageSrc(item.heroImageUrl)}
                          alt={item.heroImageAlt}
                          className="h-72 w-full object-cover object-top transition duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-72 w-full bg-emerald-100" aria-hidden="true" />
                      )}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent p-6 text-white">
                        <time className="text-xs font-semibold uppercase tracking-[0.4em] text-green-200/80">
                          {formatPublishedDate(item.publishedAt)}
                        </time>
                        <h3 className="mt-3 text-2xl font-semibold">{item.title}</h3>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="mt-10 text-sm text-green-800/80">
              Все още няма публикувани новини.
            </p>
          )}
        </div>
      </section>
      {showBackLink && <Footer />}
    </>
  );
}
