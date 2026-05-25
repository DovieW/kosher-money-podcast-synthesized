---
name: add-kosher-money-page
description: 'Add a new page/article to the kosher-money-podcast-synthesized Astro site. Use for researching a frum money question across the Kosher Money transcript corpus, matching the tone and structure of the existing synthesized pages, drafting a root-level Markdown article with the right frontmatter, and validating that it fits the site.'
argument-hint: 'What page should be added? Example: "Create a Q&A page on whether frum families should lease cars."'
user-invocable: true
disable-model-invocation: false
---

# Add Kosher Money Page

Use this skill when adding a new synthesized page to `kosher-money-podcast-synthesized`.

This project has an important split-brain setup:

- the **published site** lives in `kosher-money-podcast-synthesized`
- the **main research corpus** lives in the sibling repo at `/home/dovie/repos/money/context/kosher-money-podcast-transcripts/`
- related background material may also exist under `/home/dovie/repos/money/context/`

The current site reads Markdown files from the **repository root**, not from `src/pages/`. That means content workflow matters a lot here.

## What this skill should produce

A successful run of this skill should produce:

- a new root-level Markdown article in `kosher-money-podcast-synthesized`
- frontmatter that matches the site conventions
- a synthesis that reflects a **wide read** of the transcript corpus, not one or two cherry-picked episodes
- an article whose tone matches the current pages: practical, calm, nuanced, and source-aware
- a quick validation pass so the article shows up correctly in the Astro site

## Current project conventions

These are confirmed from the repo and should be treated as default behavior unless the project changes.

- The site loads **all root-level `.md` files** except `README.md`.
- Each article should include explicit frontmatter for consistency.
- Articles are routed by `slug` under `/articles/<slug>/`.
- `order` controls sorting on the homepage.
- `kind` is displayed as a badge.
- `status` is shown when not `published`.
- `readingMinutes` is calculated automatically from body content.
- Existing content patterns currently include:
  - `Guide`
  - `Q&A`
  - `Guidebook`

Important foot-gun: because the loader reads root Markdown files directly, any accidental scratch file in the repo root can turn into a public article card. Do not leave throwaway Markdown files in the root.

## Research corpus guidance

The transcripts folder contains long podcast transcripts and has known limitations:

- transcripts were machine-transcribed
- there may be errors, especially with Hebrew, Yiddish, and Aramaic terms or names
- direct quotes should be treated carefully and verified before heavy reliance

The best workflow is to **search widely and read selectively**.

Do **not** solve these pages by reading one transcript deeply and pretending it represents the corpus. The existing synthesized pages work because they look for repeated themes, tensions, and disagreements across many files.

## When to use this skill

Use this skill for tasks like:

- adding a new article page based on a frum money question
- turning a user question into a corpus-backed synthesized answer
- drafting a new `Guide` or `Q&A` page in the existing site voice
- researching a topic across multiple Kosher Money episodes before writing
- extending the site with more topic pages that feel consistent with the existing articles

## Standard workflow

### 1. Clarify the page goal

Start by identifying:

- the exact question or topic
- whether the page is best framed as `Q&A`, `Guide`, or `Guidebook`
- the likely reader intent
- what the page should help the reader understand or decide

Translate vague prompts into a sharper page thesis.

Examples:

- “Can frum families afford leasing?” → probably `Q&A`
- “How should a frum family think about emergency funds?” → probably `Guide`
- “Organize the whole corpus on weddings” → maybe `Guidebook` or a large `Guide`

### 2. Read the existing page patterns first

Before drafting, inspect the current pages in `kosher-money-podcast-synthesized` so the new one matches the established style.

Current patterns:

- `best-way-to-budget-for-a-frum-lifestyle.md`
  - practical `Guide`
  - direct framework
  - strong sectioning and actionable bullets
- `how-does-the-average-family-survive.md`
  - `Q&A`
  - starts from the original question
  - synthesizes repeated themes across many transcripts
  - highlights tensions and mixed views
- `how-much-money-do-you-need-to-buy-a-house-for-a-frum-family.md`
  - `Q&A`
  - emphasizes nuance over fake one-number answers
  - ends with key source anchors

Match the tone of those files:

- warm but not fluffy
- practical but not hyper-technical
- nuanced instead of absolutist
- explicit about what “the corpus suggests” rather than pretending to offer revealed truth

### 3. Research the corpus broadly

Primary research location:

- `/home/dovie/repos/money/context/kosher-money-podcast-transcripts/`

Secondary research location when helpful:

- `/home/dovie/repos/money/context/`

Research rules:

1. Start with wide search across many transcript files.
2. Prefer semantic search and targeted line search over dumping giant transcript files into context.
3. Build a shortlist of roughly **5 to 12 high-signal episodes**.
4. Look for:
   - repeated claims
   - important exceptions
   - disagreements or tensions
   - especially strong examples
   - concrete numbers only when the source clearly states them
5. Capture source anchors as:
   - transcript filename
   - short claim summary
   - optionally a short search phrase for later verification

A good article usually answers these questions before drafting:

- What does the corpus broadly agree on?
- Where is the corpus mixed?
- What is structural versus behavioral/cultural?
- Which sources are strongest or most direct on the question?
- What should be presented as a pattern versus a hard rule?

### 4. Decide the synthesis before writing

Do not write as if the goal is to summarize episodes one by one.

Instead, produce a synthesis that:

- groups similar ideas together
- separates major themes from minor anecdotes
- names tensions openly
- avoids forcing a false consensus
- avoids fake certainty when the sources are mixed
- distinguishes between community realities and community pressures

Useful phrasing patterns:

- “The repeated conclusion is…”
- “Across the transcripts, the strongest pattern is…”
- “The corpus is mixed on…”
- “Some sources argue…, while others push back…”
- “The broader answer is…”

### 5. Draft the article in the correct location

Create the article as a **root-level `.md` file** in `kosher-money-podcast-synthesized`.

Do **not** place content under `src/pages/`.

Use frontmatter like this:

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
```

Field expectations:

- `title`: page title and article card title
- `slug`: clean URL segment
- `description`: short summary for the article card and metadata
- `kind`: typically `Guide`, `Q&A`, or `Guidebook`
- `order`: numeric sort order on the homepage
- `status`: usually `published` or `wip`
- `featured`: usually `false` unless there is an intentional homepage highlight decision

Choose `order` deliberately:

- if simply adding the next article, use the next available integer
- if inserting into an existing sequence, keep the homepage order intentional

### 6. Use the right structure for the article type

#### Q&A page pattern

Use a structure similar to the current synthesized Q&A pages:

- `## Original question`
- quoted user question
- `## Executive summary` or `## What the corpus broadly says`
- sections for major themes
- sections for tensions / mixed views / tradeoffs
- `## Bottom line`
- `## Key source anchors`

This format works well when the user starts with a natural-language question.

#### Guide page pattern

Use a structure similar to the budgeting page:

- `## Overview`
- why the topic matters
- core principle or framework
- practical structure / steps / categories
- common mistakes or what usually goes wrong
- `## Bottom line`
- optional `## Simple starter version`

This format works well when the goal is to give a practical framework rather than answer one narrow question.

### 7. Match the site voice

The writing voice should stay aligned with the existing site.

Preferred qualities:

- clear
- grounded
- non-preachy
- values-aware
- calm under uncertainty
- direct about tradeoffs

Writing rules:

- prefer synthesis over transcript recap
- use bullets liberally when they improve clarity
- use bold only for real takeaway lines
- avoid sounding like individualized financial, tax, legal, mortgage, insurance, investment, or halachic advice
- avoid pretending the corpus is unanimous when it is not
- avoid fake precision unless a transcript clearly provides a number or range
- do not over-quote rough transcripts when paraphrase is safer

### 8. Keep source awareness visible

The existing pages are stronger when they show their source-awareness explicitly.

Good ways to do that:

- mention transcript filenames in relevant sections
- end with `## Key source anchors` when the article is source-heavy
- distinguish broad synthesis from individual-episode claims
- treat one dramatic anecdote as illustrative, not definitive

For practical claims, it is better to say:

- “This shows up strongly in…”
- “The clearest version of this appears in…”
- “A major counterpoint appears in…”

than to imply the entire corpus speaks with one voice.

### 9. Validate before finishing

After drafting:

1. Confirm the new file is in the repo root.
2. Check that the frontmatter is complete and valid.
3. Confirm the slug reads well as a URL.
4. Make sure the description works as a card summary.
5. Check that the article references multiple relevant transcripts, not just one.
6. Make sure the tone matches the current site.
7. Run the site build to verify nothing broke.

Current validation command:

- `npm run build`

## Main foot-guns

### Overfitting to one episode

Do not let one charismatic or dramatic episode define the whole answer if the wider corpus is more nuanced.

### Turning transcripts into direct authority

These are transcripts, not polished source manuscripts. Be careful with exact quotes and names.

### Confusing “important” with “unanimous”

A theme can be frequent and still contested. Preserve the nuance.

### Leaving research notes in the repo root

Because root Markdown files are auto-loaded as articles, scratch notes in the root can leak into the site.

### Putting content under `src/pages`

That feels natural in Astro, but this repo intentionally does **not** use that pattern for articles.

### Using vague descriptions and generic titles

A good article should answer a recognizable reader question and look strong on the homepage card.

## Completion checks

This skill is complete when:

- a new article exists in the repo root
- the frontmatter matches project conventions
- the article is based on a broad read of the transcript corpus
- the writing tone matches the existing synthesized pages
- major claims are source-aware and not overstated
- the build passes

## Good follow-up customizations

If this workflow becomes frequent, useful next additions would be:

- an article template file under this skill’s `assets/` folder
- a source-tracking worksheet for transcript anchors
- a separate skill for expanding the long-form guidebook
- a prompt for generating candidate article topics from gaps in the existing site
