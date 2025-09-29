import createImageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./sanityClient";

const builder = createImageUrlBuilder(sanityClient);

export const urlFor = (source) => (source ? builder.image(source) : null);
