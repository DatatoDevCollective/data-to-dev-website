const { client } = require("../sanity");

module.exports = async () => {
  const posts = await client.fetch(`
    *[_type == 'post' && !(_id in path('drafts.**'))] |
      order(publishedAt desc) {_id, "slug": slug.current,
      "categories": categories[]->{_id,title}, title,
      "image": mainImage.asset->{url,_id,"aspectRatio":
      metadata.dimensions.aspectRatio}, "author": author->name,
      _createdAt, _updatedAt} [0..9]
  `);

  const featured = await client.fetch(`
    *[_type == 'featured' && !(_id in path('drafts.**'))]
    {featuredPost->{_createdAt, _updatedAt, "author": author->name,
    "slug": slug.current, title, "categories": categories[]->{_id,title},
    "image": mainImage.asset->{url,_id,"aspectRatio":
    metadata.dimensions.aspectRatio}}}
  `);

  return { posts, featured };
};
