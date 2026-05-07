import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { Marked } from 'marked';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../');
const MARKDOWN = new Marked({
  gfm: true,
  breaks: false
});

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

function humanizeFileName(fileName) {
  return fileName
    .replace(/\.md$/i, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function deriveTitle(frontmatter, fileName, content) {
  if (frontmatter.title) {
    return frontmatter.title;
  }

  const headingMatch = content.match(/^#\s+(.+)$/m);
  if (headingMatch) {
    return headingMatch[1].trim();
  }

  return humanizeFileName(fileName);
}

function stripMarkdown(markdown) {
  return markdown
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[>*_~|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function deriveDescription(frontmatter, content) {
  if (frontmatter.description) {
    return frontmatter.description;
  }

  const paragraphs = content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph && !paragraph.startsWith('#') && !paragraph.startsWith('>'));

  const excerpt = stripMarkdown(paragraphs[0] ?? content);
  if (excerpt.length <= 180) {
    return excerpt;
  }

  return `${excerpt.slice(0, 177).trim()}...`;
}

function estimateReadingMinutes(content) {
  const words = stripMarkdown(content).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

async function loadArticle(fileName) {
  const filePath = path.join(ROOT_DIR, fileName);
  const source = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(source);

  const title = deriveTitle(data, fileName, content);
  const slug = data.slug || slugify(title);
  const description = deriveDescription(data, content);
  const html = await MARKDOWN.parse(content);

  return {
    title,
    slug,
    description,
    kind: data.kind || 'Article',
    order: Number(data.order ?? 999),
    status: data.status || 'published',
    featured: Boolean(data.featured),
    fileName,
    html,
    readingMinutes: estimateReadingMinutes(content)
  };
}

export async function getArticles() {
  const entries = await fs.readdir(ROOT_DIR, { withFileTypes: true });

  const markdownFiles = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((fileName) => fileName.endsWith('.md'))
    .filter((fileName) => fileName.toLowerCase() !== 'readme.md');

  const articles = await Promise.all(markdownFiles.map((fileName) => loadArticle(fileName)));

  return articles.sort((left, right) => {
    if (left.order !== right.order) {
      return left.order - right.order;
    }

    return left.title.localeCompare(right.title);
  });
}

export async function getArticleBySlug(slug) {
  const articles = await getArticles();
  const currentIndex = articles.findIndex((article) => article.slug === slug);

  if (currentIndex === -1) {
    return null;
  }

  return {
    ...articles[currentIndex],
    previous: articles[currentIndex - 1] ?? null,
    next: articles[currentIndex + 1] ?? null
  };
}
