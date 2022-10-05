The Hugo files for the BC Libraries site.

## Building the site

The site is built using [Hugo](https://gohugo.io/getting-started/installing/). Be sure to use the extended version with Sass/SCSS support.

## Adding content

Use the `hugo new` command to add content, e.g.:

### News

1. Upload the image thumbnail to the appropriate subdirectory of */var/www/html/images/news* on library.bc.edu.
2. Create an AVIF file of the image on library:
   ```bash
   npx avif image-filename.jpg
   ```
3. Create the news item:
   ```bash
   hugo new news/2022-10-headline-in-slug-form.md
    ```
4. Fill in the news metadata, using a previous story as the model.
### Faculty publication highlights

```bash
hugo new facpub/2022-05-10-facpub-name.md
```
### Exhibits

```bash
hugo new exhibit/bapst/2022-05-title.md
```

## Deploying a new version of the bento search

Use the `deploy-bento` command to deploy new versions of the bento application:

```bash
./bin/deploy-bento /path/to/bcbento-client
```
