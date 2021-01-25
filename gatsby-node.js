const path = require('path');
const createPaginatedPages = require('gatsby-paginate');

// Type defs

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type EpisodesJsonDate {
      start: Date!
    }

    type EpisodesJsonContent {
      name: String!
      links: [String!]!
      tags: [String!]!
    }

    type EpisodesJsonFields {
      episodeNumber: String
      slug: String
    }

    type EpisodesJson implements Node @dontInfer {
      fields: EpisodesJsonFields
      title: String!
      description: String!
      date: EpisodesJsonDate!
      duration: String!
      hosts: [String]!
      guests: [String]
      embedded: String!
      content: [EpisodesJsonContent]
    }
    
    type ParticipantsJsonFields {
      participantId: String
    }
    
    type ParticipantsJson implements Node @dontInfer {
      fields: ParticipantsJsonFields
      displayName: String!
      fullName: String
      socialNetwork: String
    }
  `;
  createTypes(typeDefs);
};

// Lifecycle methods

exports.onCreateNode = function() {
  return Promise.all(
    [addFileNameToEpisode, addParticipantIdToParticipant].map(fn => fn.apply(this, arguments))
  );
};

exports.createPages = async function({ actions, graphql }) {
  const episodesResult = await graphql(`
    {
      allEpisodesJson(sort: { fields: date___start, order: DESC }) {
        edges {
          node {
            title
            fields {
              episodeNumber
              slug
            }
            hosts
            guests
            content {
              name
              links
              tags
            }
            date {
              start
            }
          }
        }
      }
    }
  `);

  if (episodesResult.errors) {
    return Promise.reject(episodesResult.errors);
  }

  const episodesEdges = episodesResult.data.allEpisodesJson.edges;
  const { createPage } = actions;

  createEpisodePage({
    createPage,
    edges: episodesEdges
  });

  createTagPages({
    createPage,
    edges: episodesEdges,
  });

  createPaginatedPages({
    createPage,
    edges: episodesEdges,
    pageTemplate: 'src/templates/EpisodePaginatedTemplate.js',
    pageLength: 10, // Optional. Defaults to 10
    pathPrefix: '/page/', // Optional. Defaults to empty
    buildPath: (index, pathPrefix) =>
      index > 1 ? `${pathPrefix}${index}` : '/',
  });
};

// Implementations

function addFileNameToEpisode({ node, actions, getNode }) {
  if (node.internal.type !== 'EpisodesJson') {
    return;
  }

  const parentNode = getNode(node.parent);
  const { createNodeField } = actions;

  const episodeNumber = parentNode.name;

  createNodeField({
    node,
    name: 'episodeNumber',
    value: episodeNumber,
  });

  createNodeField({
    node,
    name: 'slug',
    value: `/episode/${episodeNumber}`,
  });
}

function addParticipantIdToParticipant({ node, actions, getNode }) {
  if (node.internal.type !== 'ParticipantsJson') {
    return;
  }

  const parentNode = getNode(node.parent);
  const { createNodeField } = actions;

  const participantId = parentNode.name;

  createNodeField({
    node,
    name: 'participantId',
    value: participantId,
  });
}

function createEpisodePage({ createPage, edges }) {
  const episodeTemplate = path.resolve('src/templates/EpisodeTemplate.js');

  edges.forEach(({ node }) => {
    const episodeNumber = node.fields.episodeNumber;

    createPage({
      path: `/episode/${episodeNumber}`,
      component: episodeTemplate,
      context: {
        episodeNumber
      },
    });
  });
}

function createTagPages({ createPage, edges }) {
  const tagTemplate = path.resolve('src/templates/EpisodeTagsTemplate.js');

  const tags = {};

  edges.forEach(({ node }) => {
    node.content.concat(node.overflow).filter(linkItem => linkItem).forEach(linkItem => {
      (linkItem.tags || {}).forEach(tag => {
        if (!tags[tag]) {
          tags[tag] = {
            name: tag,
            slug: `/episode/tags/${tag}`,
            links: [],
          };
        }
        tags[tag].links.push(linkItem);
      });
    });
  });

  // Create the tags page with the list of tags from our tags object.
  createPage({
    path: '/episode/tags',
    component: tagTemplate,
    context: {
      tags,
    },
  });

  // For each of the tags in the post object, create a tag page.

  for (const tagName in tags) {
    const tag = tags[tagName];

    createPage({
      path: tag.slug,
      component: tagTemplate,
      context: {
        tag,
      },
    });
  }
}
