interface ImportMetaEnv {
  /** n8n / Make / Formspree webhook that receives the contact form as JSON. */
  readonly PUBLIC_FORM_ENDPOINT?: string;
  readonly PUBLIC_GA4_ID?: string;
  readonly PUBLIC_META_PIXEL_ID?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
