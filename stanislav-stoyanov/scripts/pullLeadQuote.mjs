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
const OUTPUT_PATH = join(__dirname, "..", "src", "generated", "leadQuote.json");

if (!SPACE_ID || !DELIVERY_TOKEN) {
  console.error("Missing Contentful env vars");
  process.exit(1);
}

const client = createClient({ space: SPACE_ID, accessToken: DELIVERY_TOKEN });

const normalizeEntry = (entry) => {
  const f = entry.fields ?? {};
  return {
    id: entry.sys.id,
    heroQuote: f.heroQuote ?? "",
    position: f.position ?? "",
  };
};

const fetchLeadQuote = async () => {
  const res = await client.getEntries({
    content_type: "leadQuote", // set to your Contentful content type ID
    limit: 1,
    order: "-sys.updatedAt",   // or filter however you pick “current”
  });
  if (!res.items.length) return null;
  return normalizeEntry(res.items[0]);
};

try {
  const item = await fetchLeadQuote();
  if (!item) throw new Error("No lead quote entry found");
  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(
    OUTPUT_PATH,
    JSON.stringify({ generatedAt: new Date().toISOString(), item }, null, 2),
  );
  console.log(`Wrote lead quote to ${OUTPUT_PATH}`);
} catch (err) {
  console.error("Failed to pull lead quote:", err?.message ?? err);
  process.exit(1);
}
