import Portrait from './Portrait';
import { cx } from '@/lib/cx';

/** Speaker in a rounded portrait, name and role beneath, and an optional short note (Speakers page only). */
interface Props {
  name: string;
  role: string;
  photo: string;
  href?: string;
  /** Anchor id, so other pages can link to this speaker on /speakers. */
  id?: string;
  note?: string;
  categories?: string[];
  lang?: string;
  tone?: 'light' | 'dark';
}

export default function SpeakerCard({ name, role, photo, href, id, note, categories = [], lang, tone = 'light' }: Props) {
  const Tag = href ? 'a' : 'div';
  const dark = tone === 'dark';
  return (
    <li className="list-none scroll-mt-40" id={id} data-categories={categories.join(' ')}>
      <Tag href={href} className="group block rounded-[1.25rem]">
        <Portrait name={name} photo={photo} tone={tone}>
          {href && (
            <span
              className="absolute right-3 top-3 inline-grid size-10 place-items-center bg-cream text-navy opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
              aria-hidden="true"
            >
              ↗
            </span>
          )}
        </Portrait>
        <span
          className={cx(
            'mt-4 block font-display text-[1.12rem] font-extrabold leading-tight tracking-[-0.02em] sm:text-[1.2rem]',
            dark ? 'text-white' : 'text-navy',
            href && 'group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4',
          )}
        >
          {name}
        </span>
        <span className={cx('mt-1 block text-[0.9rem] leading-snug', dark ? 'text-mist' : 'text-muted')} lang={lang}>
          {role}
        </span>
      </Tag>
      {note && <p className={cx('mt-3 border-t pt-3 text-[0.92rem] leading-relaxed', dark ? 'border-white/20 text-white/80' : 'border-line text-navy/80')}>{note}</p>}
    </li>
  );
}
