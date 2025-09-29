import { getContentfulClient } from './contentfulClient.js';

const LOCALE = 'bg-BG';
const CONTENT_TYPE = 'newsArticle';

const normalizeImageUrl = (asset) => {
  const url = asset?.fields?.file?.url;
  if (!url) return null;
  return url.startsWith('http') ? url : `https:${url}`;
};

const mapEntryToArticle = (entry) => {
  const { fields, sys } = entry ?? {};
  if (!fields) return null;

  return {
    id: sys?.id,
    slug: fields.slug ?? '',
    title: fields.title ?? '',
    excerpt: fields.excerpt ?? '',
    body: fields.body ?? null,
    publishedDate: fields.publishedDate ?? null,
    heroImageUrl: normalizeImageUrl(fields.heroImage),
    heroImageAlt: fields.heroImage?.fields?.title ?? '',
  };
};

export const fetchNewsList = async (
  { limit = 20, skip = 0, preview = false } = {},
) => {
  const client = getContentfulClient({ preview });

  const response = await client.getEntries({
    content_type: CONTENT_TYPE,
    locale: LOCALE,
    limit,
    skip,
    order: '-fields.publishedDate',
  });

  return {
    items: response.items.map(mapEntryToArticle).filter(Boolean),
    total: response.total,
    skip: response.skip,
    limit: response.limit,
  };
};

export const fetchLatestNews = async (
  { limit = 3, preview = false } = {},
) => {
  const { items } = await fetchNewsList({ limit, skip: 0, preview });
  return items;
};

export const fetchNewsBySlug = async (
  slug,
  { preview = false } = {},
) => {
  if (!slug) return null;

  const client = getContentfulClient({ preview });

  const response = await client.getEntries({
    content_type: CONTENT_TYPE,
    locale: LOCALE,
    limit: 1,
    'fields.slug': slug,
  });

  const [entry] = response.items ?? [];
  return mapEntryToArticle(entry);
};

export const fetchNewsSlugs = async ({ preview = false } = {}) => {
  const client = getContentfulClient({ preview });

  const response = await client.getEntries({
    content_type: CONTENT_TYPE,
    locale: LOCALE,
    select: 'fields.slug',
    limit: 1000,
  });

  return (response.items ?? [])
    .map((item) => item.fields?.slug)
    .filter(Boolean);
};
