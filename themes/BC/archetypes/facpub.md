---
date: {{ .Date }}
year: "{{ now.Format "2006" }}"
title: "{{ replaceRE "^[a-zA-Z0-9]+-[0-9]{4}-[0-9]{2}-(.*)$" "$1" .Name | title }}"
draft: false
by: ""
authorfirstname: ""
authorlastname: ""
authorposition: ""
secondauthor: ""
secondposition: ""
thirdauthor: ""
thirdposition: ""
slug: ""
youtube: ""
samplepages: ""
showsamplepages: false
booklocation: ""
showbooklocation: true
bookcover: ""
imagealt: ""
oneoff: false
type: "facpub"
---

