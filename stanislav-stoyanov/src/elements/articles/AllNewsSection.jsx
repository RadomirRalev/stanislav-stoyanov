import { Link } from "react-router-dom";
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

const ARTICLES = (Array.isArray(newsData?.items) ? newsData.items : []).map((article) => ({
  ...article,
  heroImageUrl: article.heroImage?.url ?? "",
  heroImageAlt: article.heroImage?.alt ?? "",
}));

const AllNewsSection = ({ onClose }) => {
  if (!ARTICLES.length) {
    return (
      <section
        id="all-news"
        className="bg-gradient-to-b from-white via-emerald-50 to-emerald-100 py-16"
      >
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <p className="text-sm text-green-800/80">Все още няма публикувани новини.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="all-news"
      className="bg-gradient-to-b from-white via-emerald-50 to-emerald-100 py-16"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <header className="max-w-3xl text-green-900">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-600/70">
              Архив с новини
            </p>
            <h2 className="mt-3 text-3xl font-bold uppercase tracking-wide md:text-4xl">
              Всички обновления от кампанията
            </h2>
            <p className="mt-2 text-sm text-green-800/80 md:text-base">
              Разгледайте последните изявления и новини. Изберете заглавие за повече информация.
            </p>
          </header>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="self-start rounded-full border border-emerald-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-700 transition hover:bg-emerald-600 hover:text-white"
            >
              Затвори
            </button>
          )}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((item) => (
            <Link
              key={item.slug}
              to={`/news/${item.slug}`}
              className="group flex h-full flex-col overflow-hidden border border-emerald-200/70 bg-white/90 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-400/80"
            >
              {item.heroImageUrl ? (
                <img
                  src={resolveImageSrc(item.heroImageUrl)}
                  alt={item.heroImageAlt}
                  className="h-48 w-full object-cover object-top"
                  loading="lazy"
                />
              ) : (
                <div className="h-48 w-full bg-emerald-100" aria-hidden="true" />
              )}

              <div className="flex flex-1 flex-col gap-3 p-5 text-green-900">
                <time className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700/80">
                  {formatPublishedDate(item.publishedAt)}
                </time>
                <h3 className="text-lg font-semibold leading-snug group-hover:text-emerald-700">
                  {item.title}
                </h3>
                <p className="text-sm text-green-800/80 line-clamp-3">
                  {item.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllNewsSection;
