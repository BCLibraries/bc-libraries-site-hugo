---
title: "{{ replaceRE "^[0-9]{4}-[0-9]{2}-[0-9]{2}-(.*)$" "$1" .Name | title }}"
draft: false
expired: false
date: {{ .Date }}
year: "{{ now.Format "2006" }}"
slug: ""
destination: "/news/{{ now.Format "2006/01" }}/{{ replaceRE "^[0-9]{4}-[0-9]{2}-[0-9]{2}-(.*)$" "$1" .Name }}/"
imagethumb: ""
imagealt: ""
type: "news"
---

