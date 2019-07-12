---
title: "{{ replaceRE "^[a-zA-Z0-9]+-[0-9]{4}-[0-9]{2}-(.*)$" "$1" .Name | title }}"
subtitle: ""
draft: false
active: true
date: {{ .Date }}
daterange: ""
year: "{{ now.Format "2006" }}"
sponsor: ""
location: "{{ replaceRE "^([a-zA-Z0-9]+)-[0-9]{4}-[0-9]{2}-.*$" "$1" .Name }}"
slug: ""
image: ""
imagethumb: ""
imagealt: ""
style: "default"
type: "exhibits"
---

