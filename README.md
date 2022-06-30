The Hugo files for the BC Libraries site.

## Building the site

The site is built using [Hugo](https://gohugo.io/getting-started/installing/). Be sure to use the extended version with Sass/SCSS support.

## Adding content

Use the `hugo new` command to add content, e.g.:

```bash
hugo new news/2022-05-headline-in-slug-form.md
hugo new facpub/2022-05-10-facpub-name.md
hugo new exhibit/bapst/2022-05-title.md
```

## Deploying a new version of the bento search

Use the `deploy-bento` command to deploy new versions of the bento application:

```bash
./bin/deploy-bento /path/to/bcbento-client
```
