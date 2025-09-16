import { newsItems } from "./data/news";

export default function NewsSection() {
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
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="flex h-full flex-col overflow-hidden bg-white shadow-xl ring-1 ring-emerald-900/10"
            >
              <figure className="bg-emerald-100/40">
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  className="h-56 w-full object-cover"
                  loading="lazy"
                />
              </figure>

              <div className="flex flex-1 flex-col p-8">
                <header className="space-y-2">
                  <time className="block text-xs font-semibold uppercase tracking-wide text-emerald-600">
                    {item.date}
                  </time>
                  <h3 className="text-2xl font-semibold text-green-900">
                    {item.title}
                  </h3>
                </header>

                <p className="mt-4 flex-1 text-base leading-7 text-green-800/90">
                  {item.excerpt}
                </p>

                <a
                  href={item.url}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-emerald-700 hover:text-emerald-600"
                >
                  Read the update
                  <span aria-hidden="true">-&gt;</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
