# Personal Website — [harleyjwilson.com](https://harleyjwilson.com)

Personal website built with [Hugo](https://gohugo.io) using a modified [hugo-bearblog](https://github.com/janraasch/hugo-bearblog) theme, self-hosted on a VPS via Caddy.

## Commands

```bash
# Dev server with live reload (http://localhost:1313)
hugo server

# Dev server including draft posts
hugo server --buildDrafts

# Production build (outputs to public/)
hugo

# Production build with minification
hugo --minify

# Update theme and module dependencies
hugo mod tidy

# Create a new blog post
hugo new content blog/my-post-title.md

# Deploy to VPS
./deploy.sh
```

## Content

### Blog posts

Add markdown files to `content/blog/`. Frontmatter fields:

```yaml
---
title: "Post Title"
date: YYYY-MM-DDT00:00:00Z
tags:
  - "tag"
draft: false
---
```

### Now page

Edit `content/now.md` directly. Update the `date` field when making changes. To archive an old entry, copy its content to `content/then/YYYY-MM-DD.md` before overwriting.
