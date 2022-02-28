const sanityClient = require("@sanity/client");
const imageUrlBuilder = require("@sanity/image-url");
require("dotenv").config();

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_TOKEN, // or leave blank for unauthenticated usage
  apiVersion: "2022-02-15", // use current UTC date - see "specifying API version"!
  useCdn: process.env.NODE_ENV === "production", // `false` if you want to ensure fresh data
});

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

module.exports = { client, urlFor };
