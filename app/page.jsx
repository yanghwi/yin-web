import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { PostListItem } from "@/components/post-list-item";

export default async function HomePage() {
  const posts = await getAllPosts();
  const latest = posts.slice(0, 3);

  return (
    <div>
      <article>
        <h1>Writing about systems, culture, and craft.</h1>
        <p>
          Yin is a minimal, single-column blog focused on reflective essays about
          technology, aesthetics, and the pace of change. It is inspired by the
          calm cadence of UrlAhmed.
        </p>
        <p>
          Start with the latest essays below or browse the full archive on the{" "}
          <Link href="/blog">blog page</Link>.
        </p>
      </article>

      <section>
        <h2>Latest writing</h2>
        <ul className="post-list">
          {latest.map((post) => (
            <PostListItem key={post.url} post={post} />
          ))}
        </ul>
      </section>
    </div>
  );
}
