import { env } from '@/lib/site';

/**
 * Analytics slot. Set PUBLIC_GA4_ID (e.g. G-XXXXXXX) or
 * PUBLIC_PLAUSIBLE_DOMAIN (e.g. kilf.in). Nothing loads if both are empty.
 */
export default function Analytics() {
  const { ga4, plausible } = env;
  if (plausible) return <script defer data-domain={plausible} src="https://plausible.io/js/script.js" />;
  if (!ga4) return null;
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(ga4)},{anonymize_ip:true});`,
        }}
      />
    </>
  );
}
