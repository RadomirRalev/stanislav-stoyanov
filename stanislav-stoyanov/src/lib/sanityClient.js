import {createClient} from '@sanity/client'

const sharedConfig = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
}

const defaultClient = createClient({...sharedConfig, useCdn: true})
const previewClient = createClient({
  ...sharedConfig,
  useCdn: false,
  token: import.meta.env.SANITY_READ_TOKEN,
  perspective: 'previewDrafts',
})

export const getClient = (usePreview = false) =>
  usePreview && import.meta.env.SANITY_READ_TOKEN ? previewClient : defaultClient;
