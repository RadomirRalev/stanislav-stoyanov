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

const archiveVideos = [
  ...videos,
  {
    id: "community-roundtable",
    title: "Community Roundtable Highlights",
    date: "Jul 28, 2025",
    youtubeId: "8g1PXkB12Fo",
  },
  {
    id: "policy-breakdown",
    title: "Policy Breakdown: Affordable Housing",
    date: "Jul 11, 2025",
    youtubeId: "mT3xE1q4KQc",
  },
  {
    id: "volunteer-drive",
    title: "Volunteer Drive Kickoff",
    date: "Jun 20, 2025",
    youtubeId: "Lr9YdY5TLX8",
  },
  {
    id: "townhall-recap",
    title: "Town Hall Recap: Q&A Session",
    date: "Jun 05, 2025",
    youtubeId: "9Qh3TmTzuZI",
  },
  {
    id: "youth-programs",
    title: "Investing in Youth Programs",
    date: "May 18, 2025",
    youtubeId: "GJkM0Pn7s5k",
  },
  {
    id: "environmental-plan",
    title: "Environmental Plan Announcement",
    date: "May 02, 2025",
    youtubeId: "2vJcMJ3Fomk",
  },
];

const YouTubeShowcase = () => {
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [shareFeedback, setShareFeedback] = useState("");
  const [view, setView] = useState("showcase");
  const [playerReturnView, setPlayerReturnView] = useState("showcase");

  const selectedVideo = useMemo(() => {
    if (!selectedVideoId) return null;
    return [...archiveVideos].find(
      (video) => video.youtubeId === selectedVideoId,
    ) ?? null;
  }, [selectedVideoId]);

  const handleSelect = useCallback((videoId, sourceView = "showcase") => {
    setSelectedVideoId(videoId);
    setPlayerReturnView(sourceView);
    setView("player");
  }, []);

  const handleClose = useCallback(() => {
    setSelectedVideoId(null);
    setShareFeedback("");
    setView(playerReturnView);
  }, [playerReturnView]);

  const handleShowArchive = useCallback(() => {
    setView("archive");
    setSelectedVideoId(null);
    setShareFeedback("");
  }, []);

  const handleShowShowcase = useCallback(() => {
    setView("showcase");
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

  useEffect(() => {
    if (view === "player" && !selectedVideo) {
      setView(playerReturnView);
    }
  }, [playerReturnView, selectedVideo, view]);

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
        view === "player"
          ? { paddingTop: 48, paddingBottom: 48 }
          : view === "archive"
          ? { paddingTop: 56, paddingBottom: 56 }
          : { paddingTop: 64, paddingBottom: 64 }
      }
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <AnimatePresence mode="wait">
        {view === "player" && selectedVideo && (
          <motion.div
            key="player"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto flex w-full max-w-6xl flex-col gap-4 md:gap-5 px-6 md:px-12"
            role="dialog"
            aria-modal="true"
            aria-label={selectedVideo.title}
          >
            <div className="flex items-center justify-end text-emerald-100">
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex h-11 w-11 items-center justify-center border border-emerald-300/40 bg-emerald-900/60 text-emerald-50 shadow-lg shadow-emerald-950/30 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-emerald-800 focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950 active:scale-95"
                aria-label="Close video"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M3.22 3.22a.75.75 0 0 1 1.06 0L7 5.94l2.72-2.72a.75.75 0 1 1 1.06 1.06L8.06 7l2.72 2.72a.75.75 0 0 1-1.06 1.06L7 8.06l-2.72 2.72a.75.75 0 0 1-1.06-1.06L5.94 7 3.22 4.28a.75.75 0 0 1 0-1.06Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
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
        )}

        {view === "archive" && (
          <motion.div
            key="archive"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 md:px-12"
          >
            <header className="flex flex-col gap-4 text-emerald-100 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-300/70">
                  Архив
                </p>
                <h2 className="mt-2 text-3xl font-bold uppercase tracking-wide md:text-4xl">
                  Всички видеа
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="search"
                  placeholder="Search titles"
                  className="w-full border border-emerald-500/40 bg-emerald-900/40 px-4 py-2 text-sm text-emerald-50 placeholder:text-emerald-200/60 focus:border-emerald-300 focus:outline-none md:w-56"
                  disabled
                  aria-label="Search videos (coming soon)"
                />
                <button
                  type="button"
                  onClick={handleShowShowcase}
                  className="inline-flex items-center bg-emerald-800/70 px-4 py-2 text-sm font-semibold text-emerald-50 transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
                >
                  Назад
                </button>
              </div>
            </header>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {archiveVideos.map(({ id, title, date, youtubeId }) => (
                <motion.button
                  key={id}
                  type="button"
                  layout
                  onClick={() => handleSelect(youtubeId, "archive")}
                  className="group flex h-full flex-col overflow-hidden border border-emerald-500/30 bg-emerald-950/70 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
                  whileHover={{ translateY: -4 }}
                >
                  <img
                    src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`}
                    alt={`${title} thumbnail`}
                    className="h-40 w-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="flex flex-1 flex-col gap-2 p-5 text-emerald-50">
                    <time className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300/80">
                      {date}
                    </time>
                    <h3 className="text-lg font-semibold leading-snug text-white group-hover:text-emerald-200">
                      {title}
                    </h3>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {view === "showcase" && (
          <motion.div
            key="showcase"
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
                <div>
                  <h2 className="text-3xl font-bold uppercase tracking-wide md:text-4xl">
                    Моето мнение
                  </h2>
                  <p className="mt-2 max-w-sm text-sm text-emerald-100/70">
                    Сподели с приятели и съмишленици
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleShowArchive}
                    className="inline-flex items-center bg-emerald-500 px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-950 shadow-lg transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200"
                  >
                    Всички видеа
                  </button>
                </div>
              </div>
            </header>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {videos.map(({ id, title, date, youtubeId }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleSelect(youtubeId, "showcase")}
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
