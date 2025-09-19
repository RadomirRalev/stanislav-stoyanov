import { Link, useParams } from 'react-router-dom';
import { getNewsBySlug } from '../data/news';

const resolveImageSrc = (src) => {
  if (!src) return '';
  if (/^https?:\/\//i.test(src)) return src;
  const normalized = src.replace(/^\/+/, '');
  const withoutPublic = normalized.startsWith('public/')
    ? normalized.slice('public/'.length)
    : normalized;
  return `${import.meta.env.BASE_URL}${withoutPublic}`;
};

const NewsArticlePage = () => {
  const { slug } = useParams();
  const article = getNewsBySlug(slug);

  if (!article) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-16 text-center text-green-900">
        <h1 className="text-3xl font-bold">Article not found</h1>
        <p className="mt-4">The piece you are looking for does not exist or has been moved.</p>
        <Link to="/news" className="mt-6 inline-flex items-center gap-2 text-emerald-700">
          ← Back to news archive
        </Link>
      </main>
    );
  }

  return (
    <article className="bg-gradient-to-b from-white via-emerald-50 to-emerald-100 py-16">
      <div className="mx-auto max-w-4xl px-6">
        <header className="text-green-900">
          <time className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-600/80">
            {article.date}
          </time>
          <h1 className="mt-4 text-4xl font-bold uppercase tracking-wide">{article.title}</h1>
          {article.imageSrc && (
            <figure className="mt-8 overflow-hidden">
              <img
                src={resolveImageSrc(article.imageSrc)}
                alt={article.imageAlt}
                className="w-full object-cover object-top"
                loading="lazy"
              />
            </figure>
          )}
        </header>

        <section
          className="prose prose-emerald mt-10 max-w-none"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />

        <nav className="mt-12">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.35em] text-emerald-700 hover:text-emerald-900"
          >
            ← Back to news archive
          </Link>
        </nav>
      </div>
    </article>
  );
};

export default NewsArticlePage;
