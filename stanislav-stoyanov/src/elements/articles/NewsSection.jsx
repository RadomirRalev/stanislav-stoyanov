import { useEffect, useMemo, useRef, useState } from "react";
import Footer from "../footer/Footer";
import newsData from "../../generated/news.json";
import { ShowMoreButton } from "../common/Buttons";
import { InfoText } from "../common/InfoText";
import { DATE_FORMATTER } from "./utils/articleHelpers";
import { SearchFieldAndCloseButton } from "./utils/SearchFieldAndCloseButton";
import { SingleArticle } from "./SingleArticle";

const resolveImageSrc = (src) => {
  if (!src) return "";
  if (/^https?:\/\//i.test(src)) return src;
  return `https:${src.replace(/^\/+/, "")}`;
};

const normalizeBody = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.filter(
      (paragraph) => typeof paragraph === "string" && paragraph.trim()
    );
  }
  if (typeof value === "string" && value.trim()) return [value];
  return [];
};

const buildSearchText = ({ title = "", excerpt = "", body = [] }) => {
  const combined = [title, excerpt, Array.isArray(body) ? body.join(" ") : ""]
    .join(" ")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return combined;
};

const extractLeadBlurb = (article) => {
  if (!article) return "";
  const source =
    typeof article.excerpt === "string" && article.excerpt.trim()
      ? article.excerpt
      : Array.isArray(article.body)
      ? article.body.join(" ")
      : "";
  if (!source) return "";

  const [sentence] = source
    .split(".")
    .map((part) => part.trim())
    .filter(Boolean);
  if (!sentence) return "";
  return sentence.endsWith(".") ? sentence : `${sentence}.`;
};

const rawArticles = Array.isArray(newsData?.items) ? newsData.items : [];

const articles = rawArticles
  .map((article, index) => {
    const slug = article.slug ?? `article-${index}`;
    const publishedAtString =
      typeof article.publishedAt === "string" ? article.publishedAt : null;
    const publishedAt = publishedAtString
      ? Date.parse(publishedAtString)
      : null;
    const formattedDate =
      publishedAt && !Number.isNaN(publishedAt)
        ? DATE_FORMATTER.format(publishedAt)
        : "";

    const heroImageUrl = resolveImageSrc(
      article.heroImage?.url ?? article.heroImageUrl ?? ""
    );

    const body = normalizeBody(article.body);

    return {
      id: article.id ?? slug,
      slug,
      title: article.title ?? "?????",
      subtitle: article.subtitle ?? "",
      heroImageUrl,
      heroImageAlt:
        article.heroImage?.alt ?? article.heroImageAlt ?? article.title ?? "",
      excerpt: article.excerpt ?? "",
      blurb: extractLeadBlurb(article),
      rawBody: article.rawBody ?? null,
      body,
      searchText: buildSearchText({
        title: article.title ?? "",
        excerpt: article.excerpt ?? "",
        body,
      }),
      publishedAt,
      publishedAtString,
      formattedDate,
    };
  })
  .filter((article) => Boolean(article.slug) && Boolean(article.title));

const useDebouncedValue = (value, delay = 200) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(id);
  }, [value, delay]);

  return debounced;
};

const NewsSection = ({
  showBackLink = true,
  initialSlug = null,
  onActiveSlugChange = () => {},
} = {}) => {
  const sectionRef = useRef(null);
  const [activeSlug, setActiveSlug] = useState(initialSlug);
  const [showAllArticles, setShowAllArticles] = useState(false);
  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const debouncedQuery = useDebouncedValue(query, 200);
  const previousShowAllRef = useRef(showAllArticles);

  useEffect(() => {
    setActiveSlug(initialSlug ?? null);
  }, [initialSlug]);

  const filteredArticles = useMemo(() => {
    const q = debouncedQuery
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    if (!q) return articles;
    return articles.filter((article) => article.searchText.includes(q));
  }, [debouncedQuery]);

  const visibleArticles = useMemo(
    () => {
      // If not showing all, always base the "top 3" on the full list, not the filtered subset.
      if (!showAllArticles) return articles.slice(0, 3);
      return filteredArticles;
    },
    [articles, filteredArticles, showAllArticles]
  );

  const leadArticle = visibleArticles[0] ?? null;
  const secondaryArticles = visibleArticles.slice(1);

  const activeArticle = useMemo(() => {
    if (!activeSlug) return null;
    return articles.find((article) => article.slug === activeSlug) ?? null;
  }, [activeSlug]);

  const handleOpenArticle = (slug) => {
    if (!slug || slug === activeSlug) return;
    setActiveSlug(slug);
    onActiveSlugChange(slug);
  };

  const handleCloseArticle = () => {
    if (activeSlug === null) return;
    setActiveSlug(null);
    onActiveSlugChange(null);
    setQuery("");
    setSearchInput("");
  };

  const handleOpenAllNews = () => {
    if (activeSlug !== null) {
      setActiveSlug(null);
      onActiveSlugChange(null);
    }
    if (!showAllArticles) {
      setShowAllArticles(true);
    }
  };

  const toggleShowAllArticles = () => {
    setShowAllArticles((previous) => !previous);
    setQuery("");
    setSearchInput("");
  };

  const LabelAndCloseButton = () => {
    return (
      <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <InfoText label="Последните" headline="Акценти" />
        <ShowMoreButton
          onClickAction={handleOpenAllNews}
          label={"Виж всички"}
        />
      </header>
    );
  };

  const handleSearchSubmit = () => setQuery(searchInput);

  const NoResultsText = () => {
    return (
      <div className="rounded-md bg-white/80 p-6 text-center text-emerald-900 shadow">
        <p className="text-base font-semibold">???? ??????? ?????????</p>
        {query && (
          <p className="mt-1 text-sm text-emerald-800/80">???????? ??????</p>
        )}
      </div>
    );
  };

  const CloseAction = () => (
    <SearchFieldAndCloseButton
      query={searchInput}
      onQueryChange={(e) => setSearchInput(e.target.value)}
      onSearch={handleSearchSubmit}
      onClose={activeArticle ? handleCloseArticle : toggleShowAllArticles}
    />
  );

  const showEmpty = filteredArticles.length === 0;

  useEffect(() => {
    if (!activeSlug || !sectionRef.current) return;
    if (typeof sectionRef.current.scrollIntoView !== "function") return;
    sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activeSlug]);

  useEffect(() => {
    if (activeArticle) {
      previousShowAllRef.current = showAllArticles;
      return;
    }
    if (previousShowAllRef.current === showAllArticles) return;
    previousShowAllRef.current = showAllArticles;
    const element = sectionRef.current;
    if (!element || typeof element.scrollIntoView !== "function") return;

    if (typeof window === "undefined") {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    window.requestAnimationFrame(() => {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [activeArticle, showAllArticles]);

  if (!articles.length) {
    return (
      <>
        <section
          id="news"
          className="bg-gradient-to-b from-white via-emerald-50 to-emerald-100 py-16"
        >
          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <p className="text-sm text-emerald-900/70">.</p>
          </div>
        </section>
        {showBackLink && <Footer />}
      </>
    );
  }

  return (
    <>
      <section
        ref={sectionRef}
        id="news"
        className="bg-gradient-to-b from-white via-emerald-50 to-emerald-100 py-16"
      >
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
          <div className="relative pb-12">
            {!activeArticle &&
              (showEmpty ? (
                <>
                  <CloseAction />
                  <NoResultsText />
                </>
              ) : showAllArticles ? (
                <CloseAction />
              ) : (
                <LabelAndCloseButton />
              ))}
            {activeArticle ? (
              <>
                <CloseAction />
                <SingleArticle activeArticle={activeArticle} />
              </>
            ) : (
              <div className="space-y-10 text-emerald-900">
                {leadArticle && (
                  <button
                    type="button"
                    onClick={() => handleOpenArticle(leadArticle.slug)}
                    className="group relative block w-full cursor-pointer overflow-hidden bg-emerald-950 shadow-2xl shadow-emerald-900/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                  >
                    {leadArticle.heroImageUrl && (
                      <img
                        src={leadArticle.heroImageUrl}
                        alt={leadArticle.heroImageAlt}
                        className="h-96 w-full object-cover object-top transition duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-8 text-left text-white">
                      <time className="text-xs font-semibold uppercase tracking-[0.4em] text-green-200/80">
                        {leadArticle.formattedDate ||
                          leadArticle.publishedAtString ||
                          ""}
                      </time>
                      <h3 className="mt-3 text-3xl font-semibold">
                        {leadArticle.title}
                      </h3>
                      {leadArticle.blurb && (
                        <p className="mt-4 text-base text-green-100/90">
                          {leadArticle.blurb}
                        </p>
                      )}
                    </div>
                  </button>
                )}

                {secondaryArticles.length > 0 && (
                  <div className="grid gap-6 md:grid-cols-2">
                    {secondaryArticles.map((article) => (
                      <button
                        key={article.slug}
                        type="button"
                        onClick={() => handleOpenArticle(article.slug)}
                        className="group relative block cursor-pointer overflow-hidden bg-white shadow-xl shadow-emerald-200/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                      >
                        {article.heroImageUrl ? (
                          <img
                            src={article.heroImageUrl}
                            alt={article.heroImageAlt}
                            className="h-72 w-full object-cover object-top transition duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div
                            className="h-72 w-full bg-emerald-100"
                            aria-hidden="true"
                          />
                        )}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 text-left text-white">
                          <time className="text-xs font-semibold uppercase tracking-[0.4em] text-green-200/80">
                            {article.formattedDate ||
                              article.publishedAtString ||
                              ""}
                          </time>
                          <h3 className="mt-3 text-2xl font-semibold">
                            {article.title}
                          </h3>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      {showBackLink && <Footer />}
    </>
  );
};

export default NewsSection;
