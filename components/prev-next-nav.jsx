import Link from "next/link";

export function PrevNextNav({ previous, next }) {
  if (!previous && !next) return null;

  return (
    <div className="prev-next">
      {previous && <Link href={previous.url}>← {previous.title}</Link>}
      {next && <Link href={next.url}>{next.title} →</Link>}
    </div>
  );
}
