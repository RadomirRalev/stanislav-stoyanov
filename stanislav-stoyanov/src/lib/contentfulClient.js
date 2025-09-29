import { createClient } from 'contentful';

export const getContentfulClient = ({ preview = false } = {}) => {
  const space = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
  const accessToken = preview
    ? import.meta.env.VITE_CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN;
  const host = preview ? 'preview.contentful.com' : 'cdn.contentful.com';

  if (!space || !accessToken) {
    throw new Error('Missing Contentful environment variables.');
  }

  return createClient({ space, accessToken, host });
};