import { PostListItem } from "@/components/post-list-item";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog"
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <article>
        <h1>Blog</h1>
        <p>
          An archive of essays exploring cultural half-lives, tooling, and the
          human side of automation.
        </p>
      </article>
      <ul className="post-list">
        {posts.map((post) => (
          <PostListItem key={post.url} post={post} />
        ))}
      </ul>
    </div>
  );
}
