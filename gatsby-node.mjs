/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

/**
 * Visit:
 *  https://github.com/gatsbyjs/gatsby/issues/10531
 *  https://stackoverflow.com/questions/45854169/how-can-i-use-an-es6-import-in-node
 * to see discussion on creation on gatsby-node.mjs and Node's limitation for parsing ES6
 */

import { resolve } from 'path';

export default async function createPages({ actions, graphql }) {
  const { createPage } = actions;

  const blogPostTemplate = resolve('src/templates/blog-post.jsx');

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {}, // Additional data can be passed via context
    });
  });
}
