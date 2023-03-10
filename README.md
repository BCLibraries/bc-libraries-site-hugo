The Hugo files for the BC Libraries site.

## Building the site

The site is built using [Hugo](https://gohugo.io/getting-started/installing/). Be sure to use the extended version with Sass/SCSS support.

## Uploading images
Use the *bin/upload-image* script to upload images to the image directory on library, resize them, and make derivative
forms in modern image formats (avif and WebP).

```bash
./bin/upload-image -u florinb -i otter.jpg -o sample-images/animals
```

See the script's help page for a full list of options.

## Adding content

Use the `hugo new` command to add content, e.g.:

### News

1. Upload the image in jpeg or png format as a news photo using the *bin/upload-image* script:
   ```bash
   ./bin/upload-image -t news /path/to/image.jpg
   ```
2. Create the news item:
   ```bash
   hugo new news/2022-10-headline-in-slug-form.md
    ```
3. Fill in the news metadata, using a previous story as the model.
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
