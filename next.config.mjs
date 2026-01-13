import createMDX from '@next/mdx';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeHighlight from 'rehype-highlight';
import rehypeHighlightCodeLines  from 'rehype-highlight-code-lines';
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
};

/** @type {import('rehype-pretty-code').Options} */
const prettyCodeOptions = {
  // See Options section below.
  theme: 'github-dark',
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkFrontmatter, 
      [remarkMdxFrontmatter, { name: 'frontmatter' }], 
      remarkGfm,
    ],
    rehypePlugins: [rehypeHighlight, rehypeHighlightCodeLines],
  },
});

export default withMDX(nextConfig);