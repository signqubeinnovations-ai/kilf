import { marked } from 'marked';
import type { Speaker } from '@/lib/content';
import Section from '@/components/Section';
import Badge from '@/components/Badge';
import TextLink from '@/components/TextLink';
import Portrait from '@/components/Portrait';
import { localizePath, type Lang } from '@/i18n/ui';

interface Props {
  lang: Lang;
  entry: Speaker;
}

export default function SpeakerDetail(props: Props) {
  const { lang, entry } = props;
  // The bio is the Markdown below the speaker file's front matter.
  const bio = marked.parse(entry.body ?? '', { async: false });
  return (
    <>
      <Section tone="cream">
        <TextLink href={localizePath('/speakers', lang)} label="All speakers" />
        <div className="mt-8 grid items-start gap-10 md:grid-cols-[20rem_1fr] lg:gap-16">
          <Portrait name={entry.data.name} photo={entry.data.photo} sizes="(min-width: 768px) 320px, 100vw" widths={[320, 640]} className="w-full max-w-sm" eager />
          <div>
            {entry.data.status === 'proposed' && <Badge>Proposed · subject to confirmation</Badge>}
            <h1 className="display mt-5 text-5xl text-navy sm:text-7xl">{entry.data.name}</h1>
            <p className="mt-3 text-xl text-muted">{entry.data.role}</p>
            <div
              className="mt-8 max-w-2xl space-y-4 border-t border-line pt-8 text-lg leading-relaxed text-navy/90 [&_a]:font-bold [&_a]:text-cobalt [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-4"
              dangerouslySetInnerHTML={{ __html: bio }}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
