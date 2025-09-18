const events = [
  {
    id: "september-town-hall",
    title: "Заседание на Комисията по земеделие",
    date: "12 септември, 2025",
    time: "18:30",
    location: "ЕП Брюксел",
    url: "#town-hall"
  },
  {
    id: "school-forum",
    title: "Среща с граждани",
    date: "18 септември, 2025",
    time: "17:00",
    location: "Велико Търново, хотел 'Интерконтинентал'",
    url: "#school-forum"
  },
  {
    id: "small-business-roundtable",
    title: "Изказване на пленарно заседание по темата 'Миграционни политики в Европа'",
    date: "22 септември, 2025",
    time: "20:00",
    location: "ЕП Страсбург",
    url: "#business-roundtable"
  },
];

const UpcomingEvents = () => {
  return (
    <section className="bg-gradient-to-b from-white via-emerald-50 to-emerald-100 py-16">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <header className="max-w-3xl text-green-900">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-600/70">
            Следете моята дейност
          </p>
          <h2 className="mt-3 text-3xl font-bold uppercase tracking-wide md:text-4xl">
            Какво предстои?
          </h2>    
        </header>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {events.map(({ id, title, date, time, location, url }) => (
            <a
              key={id}
              href={url}
              className="group flex h-full flex-col justify-between border border-emerald-200/70 bg-white/80 p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-400/80"
            >
              <div className="space-y-3">
                <time className="block text-xs font-semibold uppercase tracking-[0.35em] text-emerald-600/80">
                  {date}
                </time>
                <h3 className="text-xl font-semibold text-green-900 group-hover:text-emerald-700">
                  {title}
                </h3>
                <p className="text-sm font-medium text-emerald-700/80">
                  {time}
                </p>
                <p className="text-sm leading-relaxed text-green-800/80">
                  {location}
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-600 group-hover:text-emerald-700">
                Подробности
                <span aria-hidden="true">→</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
