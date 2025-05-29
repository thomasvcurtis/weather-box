/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAPBOX_API_KEY: string
  readonly VITE_BASE_URL: string
  // Add other env variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}