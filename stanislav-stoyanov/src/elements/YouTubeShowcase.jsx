const videos = [
  {
    id: "roadmap-update",
    title: "Roadmap For Safer Neighborhoods",
    date: "Aug 30, 2025",
    youtubeId: "0z15Xz5k86U",
  },
  {
    id: "schools-panel",
    title: "Improving Our Schools",
    date: "Aug 22, 2025",
    youtubeId: "dR0FUPIfbg8",
  },
  {
    id: "small-business",
    title: "Small Business Listening Tour",
    date: "Aug 14, 2025",
    youtubeId: "WQbd_z1g-Jg",
  },
];

const YouTubeShowcase = () => {
  return (
    <section className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <header className="text-emerald-100">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-300/70">
            Последни видеа
          </p>
          <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="text-3xl font-bold uppercase tracking-wide md:text-4xl">
              Моето мнение
            </h2>
            <p className="max-w-sm text-sm text-emerald-100/70">
              Сподели с приятели и съмишленици.
            </p>
          </div>
        </header>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {videos.map(({ id, title, date, youtubeId }) => (
            <a
              key={id}
              href={`https://www.youtube.com/watch?v=${youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col overflow-hidden rounded-none bg-emerald-950/70 ring-1 ring-emerald-600/30 transition duration-300 hover:-translate-y-1 hover:ring-emerald-300/50"
            >
              <img
                src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                alt={`${title} thumbnail`}
                className="h-48 w-full object-cover object-top"
                loading="lazy"
              />
              <div className="flex flex-1 flex-col gap-2 p-5 text-emerald-50">
                <time className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300/80">
                  {date}
                </time>
                <h3 className="text-lg font-semibold leading-snug text-white">
                  {title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YouTubeShowcase;

