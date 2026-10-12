// Runs after `next build`: removes the placeholder speaker page that the static
// export needs while no speaker has a bio yet (see src/app/(en)/speakers/[slug]).
import fs from 'node:fs/promises';
import path from 'node:path';

const out = path.resolve(new URL('..', import.meta.url).pathname, 'out');
for (const dir of ['speakers/_no-bio', 'ml/speakers/_no-bio']) {
  await fs.rm(path.join(out, dir), { recursive: true, force: true });
  for (const ext of ['.html', '.txt']) await fs.rm(path.join(out, dir + ext), { force: true });
}
