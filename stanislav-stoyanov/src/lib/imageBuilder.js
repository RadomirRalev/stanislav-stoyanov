import createImageUrlBuilder from '@sanity/image-url'
import {getClient} from './sanityClient'

const builder = createImageUrlBuilder(getClient)
export const urlFor = source => source ? builder.image(source) : null
