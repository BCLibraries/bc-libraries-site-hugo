The Hugo files for the BC Libraries site.

## Installation

### Prerequisites

1. [Hugo](https://gohugo.io/) extended edition (recommend using Homebrew on Mac or Choclatey on Windows)
2. [NodeJS](https://nodejs.dev/en/learn/how-to-install-nodejs/) for testing

### Install

1. Clone the site into a new directory.
    ```bash
    git clone https://github.com/BCLibraries/bc-libraries-site-hugo.git
    ```
2. Install the testing framework.
    ```bash
    cd bc-libraries-site-hugo
    npm install
    ```

## Building the site

The site is built using [Hugo](https://gohugo.io/getting-started/installing/). Be sure to use the extended version with Sass/SCSS support.

## Adding content

Use the `hugo new` command to add content, e.g.:

### News

1. Upload the image thumbnail to the appropriate subdirectory of */var/www/html/images/news* on library.bc.edu.
2. Create an AVIF and webp files of the image on library:
   ```bash
   npx avif image-filename.jpg
   mogrify -format webp image-filename.jpg
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

## Testing

We use WebDriverIO for end-to-end tests. Spec files are in the */test/specs* directory. To run:

```bash
npx wdio run ./wdio.conf.js
```

## Deploying a new version of the bento search

Use the `deploy-bento` command to deploy new versions of the bento application:

```bash
./bin/deploy-bento /path/to/bcbento-client
```
