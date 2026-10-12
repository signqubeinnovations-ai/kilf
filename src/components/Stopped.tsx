/**
 * Text for a large headline, with its closing full stop drawn in a little:
 * at display sizes the typeface leaves a gap before it (see .stop).
 */
export default function Stopped({ text }: { text: string }) {
  const stop = text.endsWith('.') && !text.endsWith('..');
  return stop ? (
    <>
      {text.slice(0, -1)}
      <span className="stop">.</span>
    </>
  ) : (
    <>{text}</>
  );
}
