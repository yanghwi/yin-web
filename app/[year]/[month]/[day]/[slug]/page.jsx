import { notFound } from "next/navigation";
import { PrevNextNav } from "@/components/prev-next-nav";
import {
  formatPostDate,
  getAdjacentPosts,
  getAllPostParams,
  getPostByParams
} from "@/lib/posts";
import { renderMarkdown } from "@/lib/markdown";

export async function generateStaticParams() {
  return getAllPostParams();
}

export async function generateMetadata({ params }) {
  const post = await getPostByParams(params);
  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.excerpt
  };
}

export default async function PostPage({ params }) {
  const post = await getPostByParams(params);

  if (!post) {
    notFound();
  }

  const html = await renderMarkdown(post.content);
  const { previous, next } = await getAdjacentPosts(post);

  return (
    <article>
      <h1>{post.title}</h1>
      <div className="meta">
        <span>{formatPostDate(post.date)}</span>
        {post.tags.length > 0 && <span>{post.tags.join(", ")}</span>}
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <PrevNextNav previous={previous} next={next} />
    </article>
  );
}
