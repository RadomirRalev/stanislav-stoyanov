import {createClient} from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import groq from "groq";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID,
  dataset: process.env.VITE_SANITY_DATASET,
  apiVersion: process.env.VITE_SANITY_API_VERSION || "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_READ_TOKEN,
});

const query = groq`*[_type == "newsArticle"] | order(date desc) {
  _id,
  title,
  subtitle,
  "slug": slug.current,
  date,
  excerpt,
  body,
  mainImage {
    asset->{
      _id,
      url
    },
    altText
  }
}`;

const data = await client.fetch(query);

const mapped = data.map((item) => ({
  id: item._id,
  title: item.title,
  subtitle: item.subtitle,
  slug: item.slug,
  date: item.date,
  excerpt: item.excerpt,
  body: item.body,
  image: item.mainImage,
}));

const outDir = path.resolve("src/generated");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
fs.writeFileSync(path.join(outDir, "news.json"), JSON.stringify(mapped, null, 2));
console.log(`Saved ${mapped.length} articles from Sanity`);
