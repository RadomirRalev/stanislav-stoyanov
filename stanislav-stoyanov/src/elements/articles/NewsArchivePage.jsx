import { Link } from "react-router-dom";
import { getAllNews } from "../data/news";
import { urlFor } from "../../lib/imageBuilder";

const resolveLegacyImageSrc = (src) => {
  if (!src) return "";
  if (/^https?:\/\//i.test(src)) return src;
  const normalized = src.replace(/^\/+/, "");
  const withoutPublic = normalized.startsWith("public/")
    ? normalized.slice("public/".length)
    : normalized;
  return `${import.meta.env.BASE_URL}${withoutPublic}`;
};

const getImageUrl = (image, fallbackSrc) => {
  if (image) {
    return urlFor(image).width(800).height(480).fit("crop").auto("format").url();
  }
  return resolveLegacyImageSrc(fallbackSrc);
};

const NewsArchivePage = () => {
  const articles = getAllNews();

  return (
    <main className="bg-gradient-to-b from-white via-emerald-50 to-emerald-100 py-16 text-green-900">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-600/80">
            News
          </p>
          <h1 className="mt-3 text-3xl font-bold uppercase tracking-wide md:text-4xl">
            News Archive
          </h1>
          <p className="mt-4 text-base text-emerald-900/80">
            Browse every update from the campaign trail.
          </p>
        </header>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => {
            const imageUrl = getImageUrl(article.image, article.imageSrc);

            return (
              <Link
                key={article.id}
                to={`/news/${article.slug}`}
                className="group flex h-full flex-col overflow-hidden border border-emerald-200/70 bg-white/90 shadow-sm transition hover:-translate-y-1 hover:border-emerald-400"
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={article.imageAlt || article.image?.altText || article.title}
                    className="h-48 w-full object-cover object-top"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-48 w-full bg-emerald-100" aria-hidden="true" />
                )}

                <div className="flex flex-1 flex-col gap-3 p-5">
                  <time className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700/80">
                    {article.date}
                  </time>
                  <h2 className="text-lg font-semibold leading-snug group-hover:text-emerald-700">
                    {article.title}
                  </h2>
                  <p className="text-sm text-emerald-900/80 line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default NewsArchivePage;
