import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { PostListItem } from "@/components/post-list-item";

export default async function HomePage() {
  const posts = await getAllPosts();
  const latest = posts.slice(0, 3);

  return (
    <div>
      <h1>Yin</h1>
      <p>
        A blog. See <Link href="/blog">all posts</Link>.
      </p>

      <h2>Recent</h2>
      <ul className="post-list">
        {latest.map((post) => (
          <PostListItem key={post.url} post={post} />
        ))}
      </ul>
    </div>
  );
}
