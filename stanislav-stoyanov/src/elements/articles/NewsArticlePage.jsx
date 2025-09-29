import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchNewsBySlug } from "../../lib/newsQueries.js";

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

const NewsArticlePage = () => {
  const { slug } = useParams();
  const [{ loading, article, error }, setState] = useState({
    loading: true,
    article: null,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    const loadArticle = async () => {
      if (!slug) {
        setState({ loading: false, article: null, error: null });
        return;
      }

      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const entry = await fetchNewsBySlug(slug);
        if (!cancelled) {
          setState({ loading: false, article: entry, error: null });
        }
      } catch (err) {
        if (!cancelled) {
          setState({
            loading: false,
            article: null,
            error: err instanceof Error ? err.message : "Нещо се обърка.",
          });
        }
      }
    };

    loadArticle();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const bodyParagraphs = useMemo(() => {
    if (!article) return [];
    if (Array.isArray(article.body) && article.body.length > 0) return article.body;
    if (typeof article.body === "string" && article.body.trim()) return [article.body];
    return [article.excerpt].filter(Boolean);
  }, [article]);

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-16 text-center text-green-900">
        <p className="text-lg">Зареждане на статията…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-16 text-center text-green-900">
        <h1 className="text-3xl font-bold">Възникна проблем</h1>
        <p className="mt-4">{error}</p>
        <Link
          to="/news"
          className="mt-6 inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-900"
        >
          <span aria-hidden="true">&larr;</span>
          <span>Назад към архива</span>
        </Link>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-16 text-center text-green-900">
        <h1 className="text-3xl font-bold">Статията не е намерена</h1>
        <p className="mt-4">Съдържанието е премахнато или преместено.</p>
        <Link
          to="/news"
          className="mt-6 inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-900"
        >
          <span aria-hidden="true">&larr;</span>
          <span>Назад към архива</span>
        </Link>
      </main>
    );
  }

  return (
    <article className="bg-gradient-to-b from-white via-emerald-50 to-emerald-100 py-16 text-green-900">
      <div className="mx-auto max-w-4xl px-6">
        <header>
          <time className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-600/80">
            {formatPublishedDate(article.publishedAt)}
          </time>
          <h1 className="mt-4 text-4xl font-sans font-bold uppercase tracking-wide">
            {article.title}
          </h1>
          {article.subtitle && (
            <p className="mt-3 italic text-[1.55rem] text-emerald-800">{article.subtitle}</p>
          )}
          {article.heroImageUrl && (
            <figure className="mt-8 overflow-hidden shadow-xl">
              <img
                src={resolveImageSrc(article.heroImageUrl)}
                alt={article.heroImageAlt ?? ""}
                className="w-full object-cover object-top"
                loading="lazy"
              />
            </figure>
          )}
        </header>

        <section className="mt-10 space-y-7 font-sans text-[1.25rem] leading-[2.1rem] text-emerald-900 md:text-[1.45rem] md:leading-[2.6rem]">
          {bodyParagraphs.map((paragraph, index) => (
            <p key={index} className="text-pretty">
              {paragraph}
            </p>
          ))}
        </section>

        <nav className="mt-12">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.35em] text-emerald-700 hover:text-emerald-900"
          >
            <span aria-hidden="true">&larr;</span>
            <span>Назад към новините</span>
          </Link>
        </nav>
      </div>
    </article>
  );
};

export default NewsArticlePage;
