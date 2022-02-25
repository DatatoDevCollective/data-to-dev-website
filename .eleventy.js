module.exports = (config) => {
  config.addWatchTarget("./src/sass");
  config.addPassthroughCopy("./src/sass");
  config.addPassthroughCopy("images");

  // Filter for cache busting. Adds a ?v=<UNIX timestamp at build time>
  // query string to the URL.
  // use as <img src="{{ '/path/to/file' | url | bust }}" />
  config.addFilter("bust", (url) => {
    const [urlPart, paramPart] = url.split("?");
    const params = new URLSearchParams(paramPart || "");
    params.set("v", Math.floor(Date.now() / 1000));
    return `${urlPart}?${params}`;
  });

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
