import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { useMemo } from "react";

const richTextOptions = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong>{text}</strong>,
    [MARKS.ITALIC]: (text) => <em>{text}</em>,
    [MARKS.UNDERLINE]: (text) => <span className="underline">{text}</span>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node, children) => (
      <p className="text-pretty">{children}</p>
    ),
    [BLOCKS.HEADING_2]: (_node, children) => (
      <h2 className="mt-12 text-2xl font-semibold tracking-wide text-emerald-900">
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (_node, children) => (
      <h3 className="mt-10 text-xl font-semibold tracking-wide text-emerald-900">
        {children}
      </h3>
    ),
    [BLOCKS.UL_LIST]: (_node, children) => (
      <ul className="list-disc space-y-3 pl-6 text-pretty">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node, children) => (
      <ol className="list-decimal space-y-3 pl-6 text-pretty">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node, children) => <li>{children}</li>,
    [INLINES.HYPERLINK]: (node, children) => (
      <a
        href={node.data.uri}
        className="text-emerald-700 underline underline-offset-4 transition hover:text-emerald-900"
        target={node.data.uri?.startsWith("http") ? "_blank" : undefined}
        rel={
          node.data.uri?.startsWith("http") ? "noopener noreferrer" : undefined
        }
      >
        {children}
      </a>
    ),
  },
};

export const SingleArticle = (
  formattedDate,
  publishedAtString,
  title,
  excerpt,
  subtitle,
  activeArticle,
  shareLinks
) => (
  <>
    <header className="space-y-4">
      <time
        className="text-xs font-semibold uppercase tracking-[0.4em] text-black"
        style={{
          fontFamily:
            "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {formattedDate || publishedAtString || ""}
      </time>
      <h2
        className="text-3xl font-bold uppercase tracking-wide md:text-4xl"
        style={{
          fontFamily:
            "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {title}
      </h2>
      {excerpt && <p className="text-base text-black md:text-lg">{excerpt}</p>}
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
      {subtitle && (
        <p className="text-base italic text-emerald-800 md:text-lg">
          {subtitle}
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
        <span className="transition-colors duration-300">·</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          ·
        </span>
      </span>
    </div>
  </>
);
