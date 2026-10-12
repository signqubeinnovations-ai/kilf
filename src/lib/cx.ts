/** Join class names, skipping empty values (like Astro's class:list). */
export const cx = (...parts: (string | false | null | undefined | 0)[]) => parts.filter(Boolean).join(' ');
