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
    name: "Twitter",
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
          d="M13.8 4.312a4.63 4.63 0 0 1-1.323.363 2.31 2.31 0 0 0 1.015-1.275 4.64 4.64 0 0 1-1.466.56 2.3 2.3 0 0 0-3.918 1.57c0 .18.02.356.06.523-1.91-.095-3.603-1.01-4.737-2.402a2.283 2.283 0 0 0-.312 1.156 2.3 2.3 0 0 0 1.023 1.914 2.29 2.29 0 0 1-1.042-.288v.03a2.3 2.3 0 0 0 1.846 2.252 2.32 2.32 0 0 1-1.04.04 2.302 2.302 0 0 0 2.148 1.596 4.616 4.616 0 0 1-2.853.983c-.185 0-.366-.01-.546-.03A6.53 6.53 0 0 0 6.196 13c4.196 0 6.492-3.477 6.492-6.49 0-.099-.002-.196-.007-.293a4.64 4.64 0 0 0 1.12-1.205Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    buildHref: (url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
    icon: (
      <svg
        viewBox="0 0 16 16"
        className="h-4 w-4"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M4.178 13H2V5.667h2.178V13Zm-.26-8.433a1.298 1.298 0 0 1-1.32-1.28c0-.7.573-1.287 1.32-1.287.747 0 1.313.588 1.327 1.287a1.3 1.3 0 0 1-1.327 1.28Zm10.082 8.433h-2.177V9.446c0-.848-.303-1.428-1.062-1.428-.58 0-.925.39-1.077.766-.056.135-.07.324-.07.513V13H7.438s.029-5.788 0-6.333h2.176v.896c.289-.445.806-1.081 1.958-1.081 1.429 0 2.428.936 2.428 2.946V13Z"
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
