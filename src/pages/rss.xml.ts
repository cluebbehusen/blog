import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt({ html: true });

export async function GET(context: { site: URL }) {
  const posts = await getCollection('blog');
  const siteUrl = context.site.toString().replace(/\/$/, '');

  return rss({
    title: 'luebbehusen.dev',
    description: 'A blog about software and other things',
    site: context.site,
    customData: `<atom:link href="${context.site}rss.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>connor@luebbehusen.dev (Connor Luebbehusen)</managingEditor>
    <image>
      <url>${context.site}icon.png</url>
      <title>luebbehusen.dev</title>
      <link>${context.site}</link>
    </image>`,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    items: posts
      .sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf())
      .map((post) => {
        const html = parser.render(post.body ?? '');
        const content = html.replace(/src="\/([^"]+)"/g, `src="${siteUrl}/$1"`);
        return {
          title: post.data.title,
          pubDate: post.data.published,
          description: post.data.description,
          link: `/blog/${post.slug}/`,
          content,
          author: 'connor@luebbehusen.dev (Connor Luebbehusen)',
        };
      }),
  });
}
