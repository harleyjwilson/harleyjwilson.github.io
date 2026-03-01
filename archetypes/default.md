---
title: "{{ replace .Name "-" " " | title }}"
date: "{{ .Date }}"

# Set menu to "main" to add this page to the main menu
# menu: main

# description is optional
# description: "An optional description for SEO. If not provided, an automatically created summary will be used."

# tags are optional
# tags: []
---

This is a page about "{{ replace .Name "-" " " | title }}".
