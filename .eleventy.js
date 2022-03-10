const { urlFor } = require("./src/sanity");
const { inspect } = require("util");

module.exports = (config) => {
  config.addWatchTarget("./src/sass");
  config.addPassthroughCopy("./src/sass");
  config.addPassthroughCopy("./src/assets");

  // Filter for cache busting. Adds a ?v=<UNIX timestamp at build time>
  // query string to the URL.
  // use as <img src="{{ '/path/to/file' | url | bust }}" />
  config.addFilter("bust", (url) => {
    const [urlPart, paramPart] = url.split("?");
    const params = new URLSearchParams(paramPart || "");
    params.set("v", Math.floor(Date.now() / 1000));
    return `${urlPart}?${params}`;
  });
  // Utility filter to debug JSON objects returned from fetch requests
  config.addFilter("inspectJSON", (obj) => {
    return inspect(obj, { depth: 4 });
  });
  // Filter to build URLs for Sanity images. Supply with image _id and width.
  // Usage: {{ _id | urlFor(width) }}
  config.addFilter("urlFor", (source, width) => {
    return urlFor(source).width(width).url();
  });
  // Filter to console log data
  config.addFilter("console", (value) => {
    console.log(inspect(value, { depth: 4 }));
    return "";
  });
  // Filter to word wrap strings
  // config.addFilter("wordWrap", (s, w) =>
  //   s.replace(new RegExp(`(?![^\\n]{1,${w}}$)([^\\n]{1,${w}})\\s`, "g"), "$1\n")
  // );

  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "public",
      layouts: "_includes/layouts",
    },
  };
};
