/** A speaker gets a detail page once their Markdown file has a bio. */
export const hasBio = (body?: string) => !!body && body.replace(/<!--[\s\S]*?-->/g, '').trim().length > 0;

/** Placeholder slug for the speaker page route while no speaker has a bio (removed after the build). */
export const NO_BIO = '_no-bio';
