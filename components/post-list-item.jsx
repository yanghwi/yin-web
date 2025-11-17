import Link from "next/link";
import { formatPostDate } from "@/lib/posts";

export function PostListItem({ post }) {
  return (
    <li className="post-list-item">
      <h2>
        <Link href={post.url}>{post.title}</Link>
      </h2>
      <div className="meta">
        <span>{formatPostDate(post.date)}</span>
        {post.tags.length > 0 && <span>{post.tags.join(", ")}</span>}
      </div>
      {post.excerpt && <p>{post.excerpt}</p>}
    </li>
  );
}
