const mode = process.env.NODE_ENV === "production";

console.log(mode ? "production": "development");

const Bundler = require("parcel-bundler");
const Path = require("path");
const APP_PATH = process.env.APP_PATH;


const indexFile = Path.join(APP_PATH, "index.html");
const outputFolder = Path.join(APP_PATH, "public");

const options = {
    outDir: outputFolder,
    publicUrl: outputFolder,
    watch: !mode,
    cache: !mode,
    contentHash: mode,
    minify: mode,
    hmr: false,
    sourceMaps: !mode,
    autoInstall: !mode
};

module.exports = new Bundler(indexFile, options);

