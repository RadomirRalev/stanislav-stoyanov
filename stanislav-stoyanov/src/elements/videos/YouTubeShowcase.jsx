import { useCallback, useEffect, useMemo, useState } from "react";

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
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  const selectedVideo = useMemo(
    () => videos.find((video) => video.youtubeId === selectedVideoId) ?? null,
    [selectedVideoId],
  );

  const handleSelect = useCallback((videoId) => {
    setSelectedVideoId(videoId);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedVideoId(null);
  }, []);

  useEffect(() => {
    if (!selectedVideo) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose, selectedVideo]);

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
            <button
              key={id}
              type="button"
              onClick={() => handleSelect(youtubeId)}
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
            </button>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={selectedVideo.title}
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-xl bg-emerald-950/90 shadow-2xl ring-1 ring-emerald-400/30"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
              aria-label="Close video"
            >
              <span className="text-2xl leading-none">&times;</span>
            </button>
            <div className="aspect-video w-full bg-black">
              <iframe
                key={selectedVideo.youtubeId}
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="flex flex-col gap-1 border-t border-emerald-700/40 bg-emerald-950/80 p-5 text-emerald-100">
              <time className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300/80">
                {selectedVideo.date}
              </time>
              <h3 className="text-xl font-semibold">{selectedVideo.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default YouTubeShowcase;

