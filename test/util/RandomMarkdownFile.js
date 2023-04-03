const fs = require('fs');
const path = require('path');

// Types found in the /content directory that we actually
// use.
const validTypes = ['exhibits', 'facpub', 'featuredsubjectspecialist', 'news'];

/**
 * Represents a single, randomly chosen Hugo content markdown file
 */
class RandomMarkdownFile {
    /** @type {String} */
    #contentType;

    /** @type {String} */
    #filePath;

    /** @type {Object} */
    #metadata;

    /** @type {String} */
    #url;

    /**
     * Constructor
     *
     * @param {String} contentType e.g. 'facpub', 'exhibit'
     */
    constructor(contentType) {
        if (!validTypes.includes(contentType)) {
            throw new Error(`${contentType} is not a valid content type`);
        }
        this.#contentType = contentType;
        this.#filePath = pickRandomMarkdownFile(contentType);
        this.#metadata = readMarkdownMetadata(this.#filePath);
        this.#url = buildURL(this.#metadata, contentType);
    }

    /** @returns {String} */
    get filePath() {
        return this.#filePath;
    }

    /** @returns {Object} */
    get metadata() {
        return this.#metadata;
    }

    /** @returns {String} */
    get url() {
        return this.#url;
    }

    /** @returns {String} */
    get contentType() {
        return this.#contentType;
    }
}

/**
 * Pick a random markdown file of a type
 *
 * @param {String} type
 * @returns {String} the path to the file
 */
function pickRandomMarkdownFile(type) {
    const contentDir = path.join(__dirname, '..', '..', 'content', type);
    const allMDFiles = getAllMarkdownFiles(contentDir);
    return allMDFiles[Math.floor(Math.random() * allMDFiles.length)];
}

/**
 * Get an array containing all markdown files in a directory, including subdirectories
 *
 * @param dirPath {String} path to the directory to be listed
 * @param foundFiles {String[]}  list of file paths seen so far
 * @returns {String[]} list of files including those in this directory
 */
function getAllMarkdownFiles(dirPath, foundFiles = []) {
    const thingsInThisDir = fs.readdirSync(dirPath);

    foundFiles = foundFiles || [];

    thingsInThisDir.forEach((thing) => {
        if (fs.statSync(`${dirPath}/${thing}`)
            .isDirectory()) {
            // If it's a directory, recursively descend.
            foundFiles = getAllMarkdownFiles(`${dirPath}/${thing}`, foundFiles);
        } else if (thing.slice(-3) === '.md') {

            // If it's a markdown file, add it to the markdown file list.
            foundFiles.push(path.join(dirPath, '/', thing));
        }
    });

    return foundFiles;
}

/**
 * Build an URL for a markdown file
 *
 * @param {Object} metadata
 * @param {String} contentType e.g. 'exhibit', 'facpub'
 * @returns {String} the URL
 */
function buildURL(metadata, contentType) {
  const month = /^2\d\d\d-(\d\d)-\d\d/.exec(metadata.date)[1];
  return `/${contentType}/${metadata.year}/${month}/${metadata.slug}`;
}

/**
 * Read a markdown file's metadata
 *
 * Copied-and-pasted almost wholesale from code written by Dwayne Charrington
 * at https://ilikekillnerds.com/2023/01/parsing-metadata-inside-of-markdown-using-javascript-without-any-dependencies/
 *
 * @param {String} markdownFilePath full path to the file containing the markdown
 * @returns {Object} the metadata
 */
function readMarkdownMetadata(markdownFilePath) {
    // Read the file to a single long string.
    const markdown = fs.readFileSync(markdownFilePath, 'utf8');

    // Metadata in the markdown files is contained in between two lines
    // made up of three dashes. Find anything between the dashes.
    const metadataRegex = /^---([\s\S]*?)---/;
    const metadataMatch = markdown.match(metadataRegex);

    // If there is no metadata, return an empty object.
    if (!metadataMatch) {
        return {};
    }

    // Split the metadata into lines.
    const metadataLines = metadataMatch[1].split('\n');

    // Use reduce to accumulate the metadata as an object
    // and return the metadata object.
    return metadataLines.reduce((acc, line) => {
        // Split the line into key-value pairs
        const [key, value] = line.split(':')
            .map((part) => part.trim());
        // If the line is not empty add the key-value pair to the metadata object.
        if (key && value) {
            // Remove surrounding quotes from strings.
            acc[key] = value.replace(/^["'](.*)["']$/, '$1');
        }
        return acc;
    }, {});
}

module.exports = RandomMarkdownFile;
