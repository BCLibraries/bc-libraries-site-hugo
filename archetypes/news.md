{{- $this_year := now.Year -}}
{{- $this_month := printf "%02d" (int now.Month) -}}
---
# Article title
{{- /* De-slugify name and put it into title case, then fix common acronyms */ -}}
{{- $article_title := replace .Name "-" " " | title -}}
{{- $article_title = replace $article_title "Covid" "COVID" -}}
{{- $article_title = replace $article_title "Jstor" "JSTOR" -}}
{{- $article_title = replace $article_title "Erc" "ERC" -}}
{{ $article_title = replace $article_title "Bc" "BC" }}
title: "{{ $article_title }}"

# Set to true to only display in development
draft: false

# Has the story expired?
expired: false

# Date to publish. 
date: {{ .Date }}

# The story's year.
year: "{{ $this_year }}"

# Not used much.
slug: "{{ $this_year }}-{{ $this_month }}-{{ .Name }}"

# Where the article will link to when clicked
destination: "https://library.bc.edu/page-to-link-to"

# Path to image, relative to https://library.bc.edu/images/news
imagethumb: "{{ $this_year }}-{{ $this_month }}/path-to-image-01.jpg"

# Alt text for image
imagealt: ""

# Type
type: "news"
---

Comment under news image goes here
