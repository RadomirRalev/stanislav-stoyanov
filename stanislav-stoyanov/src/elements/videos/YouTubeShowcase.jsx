import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

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
  const [shareFeedback, setShareFeedback] = useState("");

  const selectedVideo = useMemo(
    () => videos.find((video) => video.youtubeId === selectedVideoId) ?? null,
    [selectedVideoId],
  );

  const handleSelect = useCallback((videoId) => {
    setSelectedVideoId(videoId);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedVideoId(null);
    setShareFeedback("");
  }, []);

  useEffect(() => {
    if (!selectedVideo) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose, selectedVideo]);

  useEffect(() => {
    if (!shareFeedback || typeof window === "undefined") return undefined;

    const timeoutId = window.setTimeout(() => setShareFeedback(""), 2200);

    return () => window.clearTimeout(timeoutId);
  }, [shareFeedback]);

  const handleShare = useCallback(async () => {
    if (!selectedVideo) return;

    const shareUrl = `https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`;

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: selectedVideo.title,
          url: shareUrl,
        });
        return;
      }

      if (
        typeof navigator !== "undefined" &&
        navigator.clipboard?.writeText
      ) {
        await navigator.clipboard.writeText(shareUrl);
        setShareFeedback("Link copied to clipboard");
        return;
      }
    } catch {
      // ignore errors and fall back to opening the link
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  }, [selectedVideo]);

  return (
    <motion.section
      className="relative bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950"
      initial={false}
      animate={
        selectedVideo
          ? { paddingTop: 48, paddingBottom: 48 }
          : { paddingTop: 64, paddingBottom: 64 }
      }
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <AnimatePresence mode="wait">
        {selectedVideo ? (
          <motion.div
            key="video"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto flex w-full max-w-6xl flex-col gap-4 md:gap-5 px-6 md:px-12"
            role="dialog"
            aria-modal="true"
            aria-label={selectedVideo.title}
          >
            <div className="flex items-center justify-between text-emerald-100">
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex items-center gap-2 bg-emerald-800/70 px-5 py-2 text-sm font-semibold text-emerald-100 shadow-sm transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
                aria-label="Close video"
              >
                Затвори
              </button>
            </div>

            <motion.div
              className="w-full overflow-hidden rounded-2xl border border-emerald-500/40 bg-black shadow-[0_25px_80px_-35px_rgba(16,185,129,0.45)]"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="aspect-video w-full">
                <iframe
                  key={selectedVideo.youtubeId}
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 bg-emerald-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-950 shadow-lg transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200"
              >
                Сподели
              </button>
              <AnimatePresence initial={false}>
                {shareFeedback && (
                  <motion.span
                    key="share-feedback"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300/90"
                  >
                    {shareFeedback}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto max-w-7xl px-6 md:px-12"
          >
            <header className="text-emerald-100">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-300/70">
                Последни видеа
              </p>
              <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <h2 className="text-3xl font-bold uppercase tracking-wide md:text-4xl">
                  Моето мнение
                </h2>
                <p className="max-w-sm text-sm text-emerald-100/70">
                  Сподели с приятели и съмишленици
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default YouTubeShowcase;