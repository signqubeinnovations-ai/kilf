import { byOrder, getStrands } from '@/lib/content';
import Icon from '../Icon';
import type { Lang } from '@/i18n/ui';

interface Props {
  lang?: Lang;
}

/** The nine strands: a quiet grid of hairlines, an icon, a name and a line. */
export default function StrandGrid(props: Props) {
  const { lang = 'en' } = props;
  const strands = byOrder(getStrands());
  const ml = lang === 'ml';
  return (
    <>
      <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
        {strands.map((s, i) => (
          <li key={i} className="flex gap-5 border-t border-line py-8">
            <Icon name={s.data.icon} size={28} className="mt-1 shrink-0 text-cobalt" />
            <div>
              <h3 className="font-display text-[1.35rem] leading-tight tracking-[-0.03em] text-navy" lang={ml ? 'ml' : undefined}>
                {ml ? s.data.name_ml : s.data.name}
              </h3>
              <p className="mt-2 text-[0.98rem] leading-relaxed text-muted" lang={ml ? 'ml' : undefined}>
                {ml ? s.data.blurb_ml : s.data.blurb}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
