import { Link } from 'react-router-dom';
import { getAllNews } from '../elements/data/news';

const NewsArchivePage = () => {
  const articles = getAllNews();
  return (
    <main className="…">
      <header>
        <h1>News Archive</h1>
        <p>Browse every update from the campaign trail.</p>
      </header>
      <div className="grid …">
        {articles.map((article) => (
          <Link key={article.id} to={`/news/${article.slug}`} className="card …">
            <img src={resolveImageSrc(article.imageSrc)} alt={article.imageAlt} />
            <time>{article.date}</time>
            <h2>{article.title}</h2>
            <p>{article.excerpt}</p>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default NewsArchivePage;