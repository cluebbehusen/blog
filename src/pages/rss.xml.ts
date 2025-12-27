import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: { site: URL }) {
  const posts = await getCollection('blog');
  return rss({
    title: 'luebbehusen.dev',
    description: 'A blog about software and other things',
    site: context.site,
    customData: `<image>
      <url>${context.site}/icon.png</url>
      <title>luebbehusen.dev</title>
      <link>${context.site}</link>
    </image>`,
    items: posts
      .sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.published,
        description: post.data.description,
        link: `/blog/${post.slug}/`,
      })),
  });
}
