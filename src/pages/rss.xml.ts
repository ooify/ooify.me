import rss from '@astrojs/rss';
import { site } from '../data/site';
import { getPublishedPosts, postUrl } from '../utils/posts';

export async function GET() {
  const posts = await getPublishedPosts();
  return rss({
    title: `${site.name} · Blog`,
    description: site.description,
    site: site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postUrl(post.id),
    })),
    customData: '<language>zh-CN</language>',
  });
}
