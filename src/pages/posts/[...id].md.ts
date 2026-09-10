import { readFile } from 'node:fs/promises';
import type { APIRoute, GetStaticPaths } from 'astro';
import type { CollectionEntry } from 'astro:content';
import { getPublishedPosts } from '../../utils/posts';

export const getStaticPaths = (async () => {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ params: { id: post.id }, props: { post } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: CollectionEntry<'posts'> };
  if (!post.filePath) throw new Error(`Missing source file for ${post.id}`);
  return new Response(await readFile(post.filePath, 'utf8'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
