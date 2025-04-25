---
title: "Migrating Bear Blog Design to Astro"
pubDate: 2024-06-10
draft: false
tags:
  - "meta"
---

Welcome to my blog! As many developers have their first blog post about creating their blog, I decided to follow suit.

Whilst I use [React](https://react.dev/) during my internship, enjoy using [Tailwind CSS](https://tailwindcss.com/) for its ease in prototyping, and experiment with new frameworks like [Svelte](https://svelte.dev/), I wanted a simple and *bear*bones (pun intended) site that is pleasant to use. Having been looking into the IndieWeb blog space for a while, I came across [Bear Blog](https://bearblog.dev).

[Bear Blog](https://bearblog.dev) is a blogging platform designed by [Herman Martinus](https://herman.bearblog.dev/) [^1] with a simple HTML and CSS frontend (with Django on the backend). The design was elegant and gets out of your way to focus on the content. Whilst I liked the design and Herman's goal with Bear Blog, I wanted to own my own data. I like being able to have my content as Markdown files. I wanted to adapt Bear Blog's design to [Astro](https://astro.build/).

## Blogging with Astro

Astro is a web framework for content-driven websites, which is perfect for a blog. You can write these Astro components in plain HTML or use other frameworks like React, Svelte, and Vue (among others). Another benefit is you don't have to think about another templating language; everything is in JavaScript.

Astro is easy to set up and get started. I used Astro's blog template for this theme as a starting point. Run `npm create astro@latest -- --template blog` to set up their blog template.

## Bear Blog's Design

I started with Bear Blog's `default.css` CSS file [from here](https://github.com/HermanMartinus/bearblog/blob/297026a877bc2ab2b3bdfbd6b9f7961c350917dd/templates/styles/blog/default.css) to get 90% of the styling. I compared the styling Bear Blog to get the rest of the way. The rest of the changes were to account for differences in how Astro render the Markdown files.

Styling the code blocks was a little difficult as Astro uses [Shiki](https://shiki.style/) to provide syntax highlighting when rending Markdown code blocks. I am currently using the GitHub Dark Default theme for the code block. I'll return to this later to get the light and dark mode working for the code blocks.

## Adding Tags

Bear Blog can add tags to your posts and filter from these tags, and I wanted to include this functionality in the theme. While the default Astro blog template doesn't come with tags, [their tutorial](https://docs.astro.build/en/tutorial/5-astro-api/2/#advanced-javascript-generate-pages-from-existing-tags) details the steps to set this up yourself.

My implementation varies from the tutorial as I wanted to make using tags optional, which is required in the tutorial's implementation. See below for the JavaScript part of the `tags/[tag].astro` file:

```javascript
---
import { getCollection } from "astro:content";

export async function getStaticPaths() {
  const allPosts = (await getCollection("blog")).sort(
    (b, a) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf()
  );

  const uniqueTags = [
    ...new Set(
      allPosts
        .flatMap((post) => post.data.tags)
        .filter((tag) => tag !== undefined)
    ),
  ];

  return uniqueTags.map((tag) => {
    const filteredPosts = allPosts.filter(
      (post) => post.data.tags && post.data.tags.includes(tag)
    );
    return {
      params: { tag },
      props: { posts: filteredPosts },
    };
  });
}

const { tag } = Astro.params;
const { posts } = Astro.props;
---
```

## Updating the RSS Configuration

The Astro blog template comes with an RSS feed generation setup; however, I wanted to update this to show the post's contents in the RSS feed.

To add this, you need to update the `items` field to include the contents:

```javascript
...
items: posts.map((post) => ({
  ...post.data,
  content: sanitizeHtml(parser.render(post.body)),
  link: `/blog/${post.slug}/`,
})),
...
```

## Simple Search Field

I will be using Astro as a static site generator and will have no backend, so I would have to outsource the search functionality. [Garrit Franke](https://garrit.xyz/) has a short blog post on setting up a [simple search bar](https://garrit.xyz/posts/2024-04-11-a-simple-search-bar) using [DuckDuckGo](https://duckduckgo.com/) to do the heavy lifting for your. Here is the code you can use on your site (replace `https://yoursite.com` with your URL).

```html
<form
  class="search"
  method="GET"
  action="https://duckduckgo.com/"
  target="_blank"
>
  <input type="search" name="q" placeholder="Search..." />
  <input type="hidden" name="sites" value="https://yoursite.com" />
</form>
```

## Wrapping Up

Feel free to check out the [repository](https://github.com/harleyjwilson/astro-bear-blog) to see the code or the [sample site](https://astro-bear-blog.vercel.app/) to see it in action. If you want to avoid the hassle of setting this up or managing your own site, I encourage you to check out [Bear Blog](https://bearblog.dev/). Herman is a developer passionate about creating this platform and plans to [keep it going for the long term](https://herman.bearblog.dev/building-software-to-last-forever/).

[^1]: [See here](https://manuelmoreale.com/pb-herman-martinus) for an interesting interview with Herman Martinus.
