import groq from "groq";
import { getClient } from "./sanityClient";

const baseFields = `
  _id,
  title,
  subtitle,
  "slug": slug.current,
  date,
  excerpt,
  body,
  mainImage{
    asset->{
      _id,
      url
    },
    altText
  }
`;

export async function fetchAllNews({ preview = false } = {}) {
  const client = getClient(preview);
  const query = groq`*[_type == "newsArticle"] | order(date desc) {${baseFields}}`;
  const items = await client.fetch(query);
  return items.map(mapToAppShape);
}

export async function fetchNewsBySlug(slug, { preview = false } = {}) {
  const client = getClient(preview);
  const query = groq`*[_type == "newsArticle" && slug.current == $slug][0]{${baseFields}}`;
  const item = await client.fetch(query, { slug });
  return item ? mapToAppShape(item) : null;
}

function mapToAppShape(item) {
  const image = item.mainImage;
  return {
    id: item._id,
    slug: item.slug,
    title: item.title,
    subtitle: item.subtitle,
    date: item.date,
    excerpt: item.excerpt,
    body: Array.isArray(item.body) ? item.body : [],
    image,
    imageSrc: image?.asset?.url || "",
    imageAlt: image?.altText || "",
  };
}
