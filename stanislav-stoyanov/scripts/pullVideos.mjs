import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import { config } from "dotenv";
import { createClient } from "contentful";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: join(__dirname, "..", ".env.local") });

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const DELIVERY_TOKEN = process.env.CONTENTFUL_DELIVERY_TOKEN;

const OUTPUT_PATH = join(__dirname, "..", "src", "generated", "videos.json");

if (!SPACE_ID || !DELIVERY_TOKEN) {
  console.error(
    "Missing CONTENTFUL_SPACE_ID or CONTENTFUL_DELIVERY_TOKEN env vars. Add them to .env.local or the shell before running this script."
  );
  process.exit(1);
}

const client = createClient({
  space: SPACE_ID,
  accessToken: DELIVERY_TOKEN,
});

const flattenText = (nodes = []) =>
  nodes
    .map((node) => {
      if (node.nodeType === "text" || typeof node.value === "string") {
        return node.value ?? "";
      }
      if (Array.isArray(node.content)) {
        return flattenText(node.content);
      }
      return "";
    })
    .join("");

const extractBody = (bodyField) => {
  if (!bodyField) return [];

  if (Array.isArray(bodyField)) {
    return bodyField.map((item) => `${item}`.trim()).filter(Boolean);
  }

  if (typeof bodyField === "string") {
    return bodyField.trim() ? [bodyField.trim()] : [];
  }

  if (Array.isArray(bodyField.content)) {
    const paragraphs = bodyField.content
      .filter((node) => node.nodeType === "paragraph")
      .map((node) => flattenText(node.content).trim())
      .filter(Boolean);

    if (paragraphs.length > 0) return paragraphs;
  }

  return [];
};

const normalizeEntry = (entry) => {
  const { fields, sys } = entry;
  const image = fields.heroImage?.fields?.file;

  return {
    id: sys.id,
    slug: fields.slug ?? "",
    title: fields.title ?? "",
    videoUrl: fields.videoUrl ?? "",
    publishedAt: fields.publishedAt ?? fields.publishedDate ?? null,
  };
};

const fetchAllNews = async () => {
  const PAGE_SIZE = 100;
  let skip = 0;
  let allItems = [];
  let total = 0;

  do {
    const response = await client.getEntries({
      content_type: "videos",
      limit: PAGE_SIZE,
      skip,
      order: "-fields.publishedDate",
    });

    allItems = allItems.concat(response.items);
    total = response.total;
    skip += response.items.length;
  } while (skip < total);

  return allItems.map(normalizeEntry);
};

try {
  const items = await fetchAllNews();

  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(
    OUTPUT_PATH,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        items,
      },
      null,
      2
    ),
  );

  console.log(`Wrote ${items.length} videos to ${OUTPUT_PATH}`);
} catch (error) {
  console.error("Failed to pull videos from Contentful:", error?.message ?? error);
  process.exit(1);
}
