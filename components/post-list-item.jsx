import Link from "next/link";
import { formatPostDate } from "@/lib/posts";

export function PostListItem({ post }) {
  return (
    <li>
      <Link href={post.url}>{post.title}</Link>
      <div className="meta">{formatPostDate(post.date)}</div>
    </li>
  );
}
