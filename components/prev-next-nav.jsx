import Link from "next/link";

export function PrevNextNav({ previous, next }) {
  if (!previous && !next) {
    return null;
  }

  return (
    <nav className="prev-next" aria-label="Post navigation">
      <div>
        {previous && (
          <Link href={previous.url} rel="prev">
            ← {previous.title}
          </Link>
        )}
      </div>
      <div>
        {next && (
          <Link href={next.url} rel="next">
            {next.title} →
          </Link>
        )}
      </div>
    </nav>
  );
}
