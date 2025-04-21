---
title: "How to Remember to Write Good Commit Messages"
pubDate: 2024-10-05
draft: false
tags:
  - "git"
---

Writing good commit messages helps others and your future self understand the timeline of changes to a repository; however, good commit messages don't just describe what changes were made, but why. A great post called [How to Write a Git Commit Message](https://cbea.ms/git-commit/) details seven core tenants to write Git commit messages:

1. Separate subject from body with a blank line
2. Limit the subject line to 50 characters
3. Capitalise the subject line
4. Do not end the subject line with a period
5. Use the imperative mood in the subject line
6. Wrap the body at 72 characters
7. Use the body to explain what and why vs. how

I recommend reading the whole post. But what if you forget these? Or want a quick reminder or an example?

A simple way to do this is to edit the default message Git shows you when you try to commit.

For example, here is the default message if I go to commit this blog post in my repo:

```bash
1
  1 # Please enter the commit message for your changes. Lines starting
  2 # with '#' will be ignored, and an empty message aborts the commit.
  3 #
  4 # On branch main
  5 # Your branch is up to date with 'origin/main'.
  6 #
  7 # Changes to be committed:
  8 #       new file:   src/content/blog/how-to-remember-to-write-good-commit-messages.md
  9 #
 10 # ------------------------ >8 ------------------------
 11 # Do not modify or remove the line above.
 12 # Everything below it will be ignored.
 13 diff --git a/src/content/blog/how-to-remember-to-write-good-commit-messages.md b/src/content/blog/how-to-remember-to-write-good-commit-messages.md
...
```

However, by adding a custom template, the message now appears like this:

```bash
1
  1 # How to Write a Git Commit Message:
  2 # https://chris.beams.io/posts/git-commit/
  3 #
  4 # 1. Separate the subject from the body with a blank line
  5 # 2. Limit the subject line to 50 characters
  6 # 3. Capitalise the subject line
  7 # 4. Do not end the subject line with a period
  8 # 5. Use the imperative mood in the subject line
  9 # 6. Wrap the body at 72 characters
 10 # 7. Use the body to explain what and why vs. how
 11 #
 12 # Example:
 13 # Summarise changes in around 50 characters or less
 14 #
 15 # More detailed explanatory text, if necessary. Wrap it to about 72
 16 # characters or so. In some contexts, the first line is treated as the
 17 # subject of the commit and the rest of the text as the body. The
 18 # blank line separating the summary from the body is critical (unless
 19 # you omit the body entirely); various tools like `log`, `shortlog`
 20 # and `rebase` can get confused if you run the two together.
 21 #
 22 # Explain the problem that this commit is solving. Focus on why you
 23 # are making this change instead of how (the code explains that).
 24 # Are there side effects or other unintuitive consequences of this
 25 # change? Here's the place to explain them.
 26 #
 27 # Further paragraphs come after blank lines.
 28 #
 29 #  - Bullet points are okay, too
 30 #
 31 #  - Typically, a hyphen or asterisk is used for the bullet preceded
 32 #    by a single space, with blank lines in between, but conventions
 33 #    vary here
 34 #
 35 # If you use an issue tracker, put references to them at the bottom,
 36 # as well as any co-authors to the commit, like this:
 37 #
 38 # Resolves: #123
 39 # See also: #456, #789
 40 #
 41 # Co-authored-by: John Smith <johnsmith@users.noreply.github.com>
 42 # Co-authored-by: Sarah Teller <sarahteller@users.noreply.github.com>
 43 #
 44 # Please enter the commit message for your changes. Lines starting
 45 # with '#' will be ignored, and an empty message aborts the commit.
 46 #
 47 # On branch main
 48 # Your branch is up to date with 'origin/main'.
 49 #
 50 # Changes to be committed:
 51 #       new file:   src/content/blog/how-to-remember-to-write-good-commit-messages.md
 52 #
 53 # ------------------------ >8 ------------------------
 54 # Do not modify or remove the line above.
 55 # Everything below it will be ignored.
 56 diff --git a/src/content/blog/how-to-remember-to-write-good-commit-messages.md b/src/content/blog/how-to-remember-to-write-good-commit-messages.md
...
```

To set this up, you need to create a `.gitmessage` file and update your Git config to load that file using a Git message template.

First, update your config via the following:

```bash
git config --global commit.template ~/.gitmessage
```

Then, create your `.gitmessage` file in your $HOME directory. For reference, the template I use is found [here in my dotfiles](https://github.com/harleyjwilson/.dotfiles/blob/main/git/.config/git/gitmessage). Please have a look at [this GitHub Gist](https://gist.github.com/lisawolderiksen/a7b99d94c92c6671181611be1641c733), the template I based mine on.

So, if you want a quick reminder or example, just run `git commit` to see the template you made. You could do something similar with [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
