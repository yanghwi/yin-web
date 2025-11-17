import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content", "posts");

/**
 * @typedef {Object} PostMeta
 * @property {string} slug
 * @property {string} title
 * @property {string} date
 * @property {string} year
 * @property {string} month
 * @property {string} day
 * @property {string} url
 */

/**
 * @typedef {PostMeta & {
 *   tags: string[];
 *   content: string;
 *   excerpt?: string;
 * }} Post
 */

export function formatPostDate(date) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
  return formatter.format(new Date(`${date}T00:00:00Z`));
}

export async function getAllPosts() {
  const files = await fs.readdir(postsDirectory);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const filePath = path.join(postsDirectory, file);
        const fileContents = await fs.readFile(filePath, "utf-8");
        const { data, content } = matter(fileContents);

        const {
          date,
          title,
          tags = [],
          excerpt,
          slug: slugFromFrontmatter
        } = /** @type {Record<string, unknown>} */ (data);

        if (!date || !title) {
          throw new Error(`Post ${file} is missing required frontmatter.`);
        }

        const slugFromFile = file
          .replace(/\.md$/, "")
          .split("-")
          .slice(3)
          .join("-");
        const slug =
          slugFromFrontmatter && typeof slugFromFrontmatter === "string"
            ? slugFromFrontmatter
            : slugFromFile || slugifyTitle(String(title));

        const url = buildPostUrl({ date: String(date), slug });
        const segments = extractDateSegments(String(date));
        const tagList = Array.isArray(tags)
          ? tags.map((tag) => String(tag))
          : typeof tags === "string"
          ? [tags]
          : [];

        return {
          slug,
          title: String(title),
          date: String(date),
          tags: tagList,
          content,
          excerpt,
          year: segments.year,
          month: segments.month,
          day: segments.day,
          url
        };
      })
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export async function getPostByParams(params) {
  const posts = await getAllPosts();
  return posts.find(
    (post) =>
      post.year === params.year &&
      post.month === params.month &&
      post.day === params.day &&
      post.slug === params.slug
  );
}

export async function getAdjacentPosts(post) {
  const posts = await getAllPosts();
  const index = posts.findIndex(
    (candidate) => candidate.slug === post.slug && candidate.date === post.date
  );

  const previous = index >= 0 ? posts[index + 1] : undefined;
  const next = index > 0 ? posts[index - 1] : undefined;

  return {
    previous: previous ? toMeta(previous) : undefined,
    next: next ? toMeta(next) : undefined
  };
}

export async function getAllPostParams() {
  const posts = await getAllPosts();
  return posts.map(({ year, month, day, slug }) => ({ year, month, day, slug }));
}

/** @param {Post} post */
function toMeta(post) {
  return {
    slug: post.slug,
    title: post.title,
    date: post.date,
    year: post.year,
    month: post.month,
    day: post.day,
    url: post.url
  };
}

function buildPostUrl({ date, slug }) {
  const { year, month, day } = extractDateSegments(date);
  return `/${year}/${month}/${day}/${slug}/`;
}

function extractDateSegments(date) {
  const [year, month, day] = date.split("-");
  return {
    year,
    month: month.padStart(2, "0"),
    day: day.padStart(2, "0")
  };
}

function slugifyTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
