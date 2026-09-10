import { getCollection } from 'astro:content';

export async function getPublishedPosts() {
  const posts = await getCollection(
    'posts',
    ({ data }) => !data.draft && data.date <= new Date(),
  );
  return posts.sort(
    (a, b) =>
      b.data.date.valueOf() - a.data.date.valueOf() || a.id.localeCompare(b.id),
  );
}

export function postUrl(id: string) {
  return `/posts/${id.split('/').map(encodeURIComponent).join('/')}/`;
}

export function formatDate(date: Date, lang = 'zh', includeYear = true) {
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'zh-CN', {
    year: includeYear ? 'numeric' : undefined,
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function postTitleTransition(id: string) {
  return (
    'post-title-' +
    Array.from(id, (char) => char.codePointAt(0)!.toString(16)).join('-')
  );
}
