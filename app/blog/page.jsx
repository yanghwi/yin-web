import { PostListItem } from "@/components/post-list-item";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog"
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <h1>Blog</h1>
      <ul className="post-list">
        {posts.map((post) => (
          <PostListItem key={post.url} post={post} />
        ))}
      </ul>
    </div>
  );
}
