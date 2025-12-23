import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";

export const DATE_FORMATTER = new Intl.DateTimeFormat("bg-BG", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export const SOCIAL_PLATFORMS = [
  {
    name: "Facebook",
    buildHref: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    icon: (
      <svg
        viewBox="0 0 16 16"
        className="h-4 w-4"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M9.6 6.002V4.884c0-.54.13-.812.94-.812h1.094V2h-1.75C7.95 2 7.2 2.818 7.2 4.422v1.58H5.6V8h1.6v6h2V8h1.586L11.2 6.002H9.6Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "X",
    buildHref: (url) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    icon: (
      <svg
        viewBox="0 0 16 16"
        className="h-4 w-4"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M2 2h3.7l2.7 3.8L11 2h3l-4.6 5.5L14 14h-3.7l-2.9-4.2L4.4 14H2l4.8-6.1L2 2Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "TikTok",
    buildHref: (url) => `https://www.tiktok.com/share/url?url=${encodeURIComponent(url)}`,
    icon: (
      <svg
        viewBox="0 0 16 16"
        className="h-4 w-4"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M9.5 2.2c.6.6 1.3 1 2.1 1.2v2A5.1 5.1 0 0 1 9.5 5V9a3.5 3.5 0 1 1-3.5-3.5c.2 0 .4 0 .6.1v2a1.5 1.5 0 1 0 1.5 1.5V2h1.4Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export const richTextOptions = {
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
