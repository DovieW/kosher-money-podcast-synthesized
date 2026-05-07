# Kosher Money Podcast Synthesized

This repository now doubles as a small static site powered by Astro and deployed with GitHub Pages.

## Stack

- Astro for static generation
- Plain Markdown files in the repo root as the source of truth
- Custom CSS for the site design
- GitHub Actions + GitHub Pages for deployment

## Local development

```bash
npm install
npm run dev
```

## Build locally

```bash
npm run build
npm run preview
```

## How content works

The site reads the Markdown files in the repository root directly.

Each article should include frontmatter like this:

```md
---
title: Example Article
slug: example-article
description: One clear sentence for the article card.
kind: Guide
order: 10
status: published
featured: false
---

# Example Article
```

### Current conventions

- `title`: page title and card title
- `slug`: clean public URL under `/articles/<slug>/`
- `description`: short card summary
- `kind`: badge shown on cards and article pages
- `order`: controls article sorting
- `status`: usually `published` or `wip`
- `featured`: set one article to `true` if you want it highlighted on the homepage

## Deployment

The workflow in `.github/workflows/deploy-pages.yml` builds the site on every push to `master` and deploys it to GitHub Pages.

In the GitHub repository settings, make sure **Pages** is configured to use **GitHub Actions** as the source.
