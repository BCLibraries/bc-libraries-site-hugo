---
# Article title
title: "{{ replace .Name "-" " " | title }}"

# Set to true to only display in development
draft: false

# Has the story expired?
expired: false

# Date to publish. 
date: {{ .Date }}

# The story's year.
year: "{{ now.Year }}"

# Not used much.
slug: "{{ now.Year }}-{{ int now.Month }}-{{ .Name }}"

# Where the article will link to when clicked
destination: "https://library.bc.edu/page-to-link-to"

# Path to image, relative to https://library.bc.edu/images/news
imagethumb: "{{ now.Year }}-{{ int now.Month }}/path-to-image-01.jpg"

# Alt text for image
imagealt: ""

# Type
type: "news"
---

Comment under news image goes here