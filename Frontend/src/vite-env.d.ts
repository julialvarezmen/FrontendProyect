/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // more env variables... adapt as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
