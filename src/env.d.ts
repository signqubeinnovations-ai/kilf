interface ImportMetaEnv {
  readonly PUBLIC_FORM_ENDPOINT?: string;
  readonly PUBLIC_FORM_ENDPOINT_PARTNER?: string;
  readonly PUBLIC_FORM_ENDPOINT_NEWSLETTER?: string;
  readonly PUBLIC_GA4_ID?: string;
  readonly PUBLIC_PLAUSIBLE_DOMAIN?: string;
  readonly PUBLIC_PARTNER_CALL_URL?: string;
  readonly PUBLIC_WHATSAPP_URL?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
