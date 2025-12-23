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

const OUTPUT_PATH = join(__dirname, "..", "src", "generated", "events.json");

if (!SPACE_ID || !DELIVERY_TOKEN) {
  console.error("Missing CONTENTFUL_SPACE_ID or CONTENTFUL_DELIVERY_TOKEN env vars.");
  process.exit(1);
}

const client = createClient({ space: SPACE_ID, accessToken: DELIVERY_TOKEN });

const normalizeEntry = (entry, index) => {
  const { fields, sys } = entry;
  return {
    id: sys.id ?? `event-${index}`,
    slug: fields.slug ?? `event-${index}`,
    title: fields.title ?? "Event",
    date: fields.date ?? fields.eventDate ?? null,
    time: fields.time ?? "",
    location: fields.location ?? "",
    url: fields.url ?? "#",
    description: fields.description ?? "",
  };
};

const fetchAllEvents = async () => {
  const PAGE_SIZE = 100;
  let skip = 0;
  let allItems = [];
  let total = 0;

  do {
    const response = await client.getEntries({
      content_type: "event",
      limit: PAGE_SIZE,
      skip,
      order: "-fields.date",
    });
    allItems = allItems.concat(response.items);
    total = response.total;
    skip += response.items.length;
  } while (skip < total);

  return allItems.map(normalizeEntry);
};

try {
  const items = await fetchAllEvents();

  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(
    OUTPUT_PATH,
    JSON.stringify({ generatedAt: new Date().toISOString(), items }, null, 2)
  );

  console.log(`Wrote ${items.length} events to ${OUTPUT_PATH}`);
} catch (error) {
  console.error("Failed to pull events from Contentful:", error?.message ?? error);
  process.exit(1);
}
