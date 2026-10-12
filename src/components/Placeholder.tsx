import { env } from '@/lib/site';

/**
 * Renders a [PLACEHOLDER] value. In dev it is highlighted so it is not
 * missed; every placeholder is listed in TODO.md.
 */
export default function Placeholder({ value }: { value: string }) {
  return (
    <span className={env.dev ? 'ph-dev' : undefined} data-placeholder>
      {value}
    </span>
  );
}
