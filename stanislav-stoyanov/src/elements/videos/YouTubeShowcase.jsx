import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion as Motion } from "motion/react";
import videosData from "../../generated/videos.json";
import { InfoText } from "../common/InfoText";
import { ShowMoreButton } from "../common/Buttons";
import { SearchField } from "../common/Fields";

const DATE_FORMATTER = new Intl.DateTimeFormat("bg-BG", {
  dateStyle: "medium",
});

const ensureHttps = (url) => {
  if (typeof url !== "string" || url.length === 0) return null;
  return url.startsWith("//") ? `https:${url}` : url;
};

const getYouTubeIdFromUrl = (url) => {
  if (typeof url !== "string") return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  const directIdMatch = trimmed.match(/^[A-Za-z0-9_-]{11}$/);
  if (directIdMatch) return directIdMatch[0];

  const urlObj = (() => {
    try {
      return new URL(
        trimmed.startsWith("http") ? trimmed : `https://${trimmed}`
      );
    } catch {
      return null;
    }
  })();

  if (!urlObj) return null;

  if (urlObj.hostname.includes("youtu.be")) {
    return urlObj.pathname.replace("/", "") || null;
  }

  if (urlObj.hostname.includes("youtube.com")) {
    const vParam = urlObj.searchParams.get("v");
    if (vParam) return vParam;
    const pathMatch = urlObj.pathname.match(/\/embed\/([A-Za-z0-9_-]{11})/);
    if (pathMatch) return pathMatch[1];
  }

  return null;
};

const rawVideos = Array.isArray(videosData?.items) ? videosData.items : [];

const normalizedVideos = rawVideos
  .map((item, index) => {
    const platform =
      item.platform ??
      (typeof item.videoUrl === "string" && item.videoUrl.includes("youtu")
        ? "YouTube"
        : "generic");

    const videoId =
      item.embedId ??
      (platform === "YouTube" ? getYouTubeIdFromUrl(item.videoUrl) : null);

    const watchUrl =
      typeof item.videoUrl === "string" && item.videoUrl.length > 0
        ? ensureHttps(item.videoUrl)
        : platform === "YouTube" && videoId
        ? `https://www.youtube.com/watch?v=${videoId}`
        : null;

    const embedUrl =
      platform === "YouTube" && videoId
        ? `https://www.youtube.com/embed/${videoId}`
        : ensureHttps(item.embedUrl);

    const publishedAtString =
      typeof item.publishedAt === "string" ? item.publishedAt : null;
    const publishedAt = publishedAtString
      ? Date.parse(publishedAtString)
      : null;

    const formattedDate =
      publishedAt && !Number.isNaN(publishedAt)
        ? DATE_FORMATTER.format(publishedAt)
        : "";

    const thumbnailAsset = item.thumbnail?.fields?.file?.url;
    const thumbnail =
      ensureHttps(thumbnailAsset) ??
      (platform === "YouTube" && videoId
        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        : null);

    return {
      id: item.id ?? item.slug ?? videoId ?? `video-${index}`,
      title: item.title ?? "Video",
      searchText: [
        item.title ?? "",
        item.description ?? "",
      ]
        .join(" ")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""),
      platform,
      embedUrl,
      watchUrl,
      thumbnail,
      publishedAt,
      formattedDate,
      description: item.description ?? "",
    };
  })
  .filter((video) => Boolean(video.watchUrl));

const sortedVideos = normalizedVideos.slice().sort((a, b) => {
  const aTime = typeof a.publishedAt === "number" ? a.publishedAt : 0;
  const bTime = typeof b.publishedAt === "number" ? b.publishedAt : 0;
  return bTime - aTime;
});

const YouTubeShowcase = () => {
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [shareFeedback, setShareFeedback] = useState("");
  const [view, setView] = useState("showcase");
  const [playerReturnView, setPlayerReturnView] = useState("showcase");

  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");

  const handleSearchSubmit = () => setQuery(searchInput.trim());

  const filteredVideos = useMemo(() => {
    const q = query
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    if (!q) return sortedVideos;
    return sortedVideos.filter((video) => video.searchText.includes(q));
  }, [query]);

  const showcaseVideos = filteredVideos.slice(0, 3);
  const archiveVideos = filteredVideos;

  const selectedVideo = useMemo(() => {
    if (!selectedVideoId) return null;
    return archiveVideos.find((video) => video.id === selectedVideoId) ?? null;
  }, [selectedVideoId]);

  const handleSelect = useCallback((videoId, sourceView = "showcase") => {
    setSelectedVideoId(videoId);
    setPlayerReturnView(sourceView);
    setView("player");
  }, []);

  const resetSearch = useCallback(() => {
    setSearchInput("");
    setQuery("");
  }, []);

  const handleClose = useCallback(() => {
    setSelectedVideoId(null);
    setShareFeedback("");
    setView((current) =>
      current === "player" ? playerReturnView : "showcase"
    );
    resetSearch();
  }, [playerReturnView, resetSearch]);

  const handleShowArchive = useCallback(() => {
    setView("archive");
    setSelectedVideoId(null);
    setShareFeedback("");
    resetSearch();
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
    if (!selectedVideo?.watchUrl) return;

    const shareUrl = selectedVideo.watchUrl;

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: selectedVideo.title,
          url: shareUrl,
        });
        return;
      }

      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
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
    <Motion.section
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
          <Motion.div
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

            <Motion.div
              className="w-full overflow-hidden rounded-2xl border border-emerald-500/40 bg-black shadow-[0_25px_80px_-35px_rgba(16,185,129,0.45)]"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="aspect-video w-full">
                {selectedVideo.embedUrl ? (
                  <iframe
                    key={selectedVideo.id}
                    className="h-full w-full"
                    src={`${selectedVideo.embedUrl}?autoplay=1`}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-emerald-950 text-center text-emerald-100">
                    <p className="max-w-md text-sm text-emerald-100/80">
                      This source cannot be embedded. Please open it in a new
                      tab.
                    </p>
                    <a
                      href={selectedVideo.watchUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-950 shadow-lg transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200"
                    >
                      Watch video
                    </a>
                  </div>
                )}
              </div>
            </Motion.div>

            <Motion.div
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
                  <Motion.span
                    key="share-feedback"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300/90"
                  >
                    {shareFeedback}
                  </Motion.span>
                )}
              </AnimatePresence>
            </Motion.div>
          </Motion.div>
        )}

        {view === "archive" && (
          <Motion.div
            key="archive"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 md:px-12"
          >
            <header className="flex flex-col gap-4 text-emerald-100 md:flex-row md:items-end md:justify-between">
              <div className="flex w-full items-center justify-between gap-3">
                <div className="w-full max-w-sm mt-6">
                  <SearchField
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onSearch={handleSearchSubmit}
                    placeholder="Търси видеа..."
                    inputClassName="text-white placeholder:text-white/70"
                  />
                </div>
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
            </header>

            {archiveVideos.length === 0 ? (
              <div className="rounded-md border border-emerald-500/30 bg-emerald-950/60 p-6 text-center text-emerald-100 shadow">
                <p className="text-base font-semibold uppercase tracking-[0.2em]">
                  Нищо не е открито
                </p>
                <p className="mt-1 text-sm text-emerald-200/80">
                  Опитайте с друга ключова дума.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {archiveVideos.map(({ id, title, formattedDate, thumbnail }) => (
                  <Motion.button
                    key={id}
                    type="button"
                    layout
                    onClick={() => handleSelect(id, "archive")}
                    className="group flex h-full flex-col overflow-hidden border border-emerald-500/30 bg-emerald-950/70 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
                    whileHover={{ translateY: -4 }}
                  >
                    {thumbnail ? (
                      <img
                        src={thumbnail}
                        alt={`${title} thumbnail`}
                        className="h-40 w-full object-cover object-top"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-40 w-full items-center justify-center bg-emerald-900/70 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
                        No thumbnail
                      </div>
                    )}
                    <div className="flex flex-1 flex-col gap-2 p-5 text-emerald-50">
                      <time className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300/80">
                        {formattedDate || "No date"}
                      </time>
                      <h3 className="text-lg font-semibold leading-snug text-white group-hover:text-emerald-200">
                        {title}
                      </h3>
                    </div>
                  </Motion.button>
                ))}
              </div>
            )}
          </Motion.div>
        )}

        {view === "showcase" && (
          <Motion.div
            key="showcase"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto max-w-7xl px-6 md:px-12"
          >
            <header className="flex flex-col gap-4 text-emerald-100 md:flex-row md:items-end md:justify-between mb-6">
              <InfoText
                label={"Последни видеа"}
                headline={"Моето мнение"}
                subtext={"Сподели с приятели и съмишленици"}
              />
              <ShowMoreButton
                onClickAction={handleShowArchive}
                label={"Всички видеа"}
              />
            </header>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {showcaseVideos.map(({ id, title, formattedDate, thumbnail }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleSelect(id, "showcase")}
                  className="group flex h-full flex-col overflow-hidden rounded-none bg-emerald-950/70 ring-1 ring-emerald-600/30 transition duration-300 hover:-translate-y-1 hover:ring-emerald-300/50"
                >
                  {thumbnail ? (
                    <img
                      src={thumbnail}
                      alt={`${title} thumbnail`}
                      className="h-48 w-full object-cover object-top"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-48 w-full items-center justify-center bg-emerald-900/70 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
                      No thumbnail
                    </div>
                  )}
                  <div className="flex flex-1 flex-col gap-2 p-5 text-emerald-50">
                    <time className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300/80">
                      {formattedDate || "No date"}
                    </time>
                    <h3 className="text-lg font-semibold leading-snug text-white">
                      {title}
                    </h3>
                  </div>
                </button>
              ))}
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.section>
  );
};

export default YouTubeShowcase;
