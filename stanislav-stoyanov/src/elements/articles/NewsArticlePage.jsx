import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import newsData from "../../generated/news.json";

const ARTICLES = (Array.isArray(newsData?.items) ? newsData.items : []).map((article) => ({
  ...article,
  heroImageUrl: article.heroImage?.url ?? "",
  heroImageAlt: article.heroImage?.alt ?? "",
}));

const richTextOptions = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong>{text}</strong>,
    [MARKS.ITALIC]: (text) => <em>{text}</em>,
    [MARKS.UNDERLINE]: (text) => <span className="underline">{text}</span>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node, children) => (
      <p className="text-pretty">{children}</p>
    ),
    [BLOCKS.HEADING_2]: (_node, children) => (
      <h2 className="mt-12 text-2xl font-semibold tracking-wide text-emerald-900">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_node, children) => (
      <h3 className="mt-10 text-xl font-semibold tracking-wide text-emerald-900">{children}</h3>
    ),
    [BLOCKS.UL_LIST]: (_node, children) => (
      <ul className="list-disc space-y-3 pl-6 text-pretty">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node, children) => (
      <ol className="list-decimal space-y-3 pl-6 text-pretty">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node, children) => <li>{children}</li>,
    [INLINES.HYPERLINK]: (node, children) => (
      <a
        href={node.data.uri}
        className="text-emerald-700 underline underline-offset-4 transition hover:text-emerald-900"
        target={node.data.uri?.startsWith("http") ? "_blank" : undefined}
        rel={node.data.uri?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
};

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

const buildParagraphs = (article) => {
  if (!article) return [];
  if (Array.isArray(article.body) && article.body.length > 0) return article.body;
  if (typeof article.body === "string" && article.body.trim()) return [article.body];
  return [article.excerpt].filter(Boolean);
};

const NewsArticlePage = () => {
  const { slug } = useParams();
  const article = useMemo(
    () => ARTICLES.find((item) => item.slug === slug),
    [slug],
  );

  const fallbackParagraphs = useMemo(() => buildParagraphs(article), [article]);

  const richTextContent = useMemo(() => {
    if (!article) return null;
    if (article.rawBody) {
      return documentToReactComponents(article.rawBody, richTextOptions);
    }
    return fallbackParagraphs.map((paragraph, index) => (
      <p key={index} className="text-pretty">
        {paragraph}
      </p>
    ));
  }, [article, fallbackParagraphs]);

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
                alt={article.heroImageAlt}
                className="w-full object-cover object-top"
                loading="lazy"
              />
            </figure>
          )}
        </header>

        <section className="article-content mt-10 space-y-7 font-sans text-[1.25rem] leading-[2.1rem] text-emerald-900 md:text-[1.45rem] md:leading-[2.6rem]">
          {richTextContent}
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
