import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useMemo, useState, useEffect } from "react";
import {
  DATE_FORMATTER,
  SOCIAL_PLATFORMS,
  richTextOptions,
} from "./utils/articleHelpers";

export const SingleArticle = ({ activeArticle, initialSlug = null }) => {
  const [activeSlug, setActiveSlug] = useState(initialSlug);

  useEffect(() => {
    setActiveSlug(initialSlug ?? null);
  }, [initialSlug]);

  const fallbackParagraphs = useMemo(() => {
    if (!activeArticle) return [];
    if (Array.isArray(activeArticle.body) && activeArticle.body.length > 0) {
      return activeArticle.body;
    }
    if (activeArticle.excerpt) return [activeArticle.excerpt];
    return [];
  }, [activeArticle]);

  const buildArticleShareUrl = (slug) => {
    if (!slug) return "";

    const baseUrl =
      typeof import.meta !== "undefined" && import.meta.env?.BASE_URL
        ? import.meta.env.BASE_URL
        : "/";

    const normalizedBase = baseUrl.endsWith("/")
      ? baseUrl.slice(0, -1)
      : baseUrl;
    const relativePath = `${normalizedBase}/news/${slug}` || `/news/${slug}`;

    if (typeof window === "undefined") {
      return relativePath.startsWith("/") ? relativePath : `/${relativePath}`;
    }

    try {
      return new URL(relativePath, window.location.origin).toString();
    } catch {
      const prefix = relativePath.startsWith("/") ? "" : "/";
      return `${window.location.origin}${prefix}${relativePath}`;
    }
  };

  const shareUrl = useMemo(
    () => (activeArticle ? buildArticleShareUrl(activeArticle.slug) : ""),
    [activeArticle]
  );

  const shareLinks = useMemo(() => {
    if (!shareUrl) return [];
    return SOCIAL_PLATFORMS.map((platform) => ({
      name: platform.name,
      href: platform.buildHref(shareUrl),
      icon: platform.icon,
    }));
  }, [shareUrl]);

  return (
    <>
      <header className="space-y-4">
        <time
          className="text-xs font-semibold uppercase tracking-[0.4em] text-black"
          style={{
            fontFamily:
              "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          }}
        >
          {activeArticle.formattedDate || activeArticle.publishedAtString || ""}
        </time>
        <h2
          className="text-3xl font-bold uppercase tracking-wide md:text-4xl"
          style={{
            fontFamily:
              "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          }}
        >
          {activeArticle.title}
        </h2>
        {activeArticle.excerpt && (
          <p className="text-base text-black md:text-lg">
            {activeArticle.excerpt}
          </p>
        )}
        {shareLinks.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2 text-emerald-700">
            {shareLinks.map(({ name, href, icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center border border-emerald-200 bg-white text-emerald-700 transition hover:-translate-y-0.5 hover:border-emerald-400 hover:text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                aria-label={`Share on ${name}`}
              >
                {icon}
                <span className="sr-only">Share on {name}</span>
              </a>
            ))}
          </div>
        )}
        {activeArticle.subtitle && (
          <p className="text-base italic text-emerald-800 md:text-lg">
            {activeArticle.subtitle}
          </p>
        )}
        {activeArticle.heroImageUrl && (
          <figure className="overflow-hidden border border-emerald-100">
            <img
              src={activeArticle.heroImageUrl}
              alt={activeArticle.heroImageAlt}
              className="w-full object-cover object-top"
              loading="lazy"
            />
          </figure>
        )}
      </header>

      <section className="mt-8 space-y-6 text-lg leading-8 text-black md:text-[1.25rem] md:leading-[2.2rem]">
        {activeArticle.rawBody
          ? documentToReactComponents(activeArticle.rawBody, richTextOptions)
          : fallbackParagraphs.map((paragraph, index) => (
              <p key={index} className="text-pretty">
                {paragraph}
              </p>
            ))}
      </section>
      <div className="group mt-10 flex items-center justify-center text-emerald-900">
        <span className="flex items-center gap-3 text-base uppercase tracking-[0.35em] transition group-hover:text-emerald-500">
          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            ·
          </span>
          <span className="transition-colors duration-300">.</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            ·
          </span>
        </span>
      </div>
    </>
  );
};
