import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import { StyleSheet, css } from 'aphrodite';
import tw from 'twin.macro';
import Layout from '../components/Layout/layout';
import SEO from '../components/seo';

/* TODO: Add a table of contents using graphql --> pageQuery */

const styles = StyleSheet.create({
  post__container: tw`mb-16 pb-16 border-b border-gray-300`,
  date__text: tw`text-gray-500 mb-4`,
  link__text: {
    textDecoration: 'none',
    color: 'hsl(220.7,26.4%,20.8%)',
    ':hover': {
      color: 'hsl(9.6,94.1%,59.8%)',
      textDecoration: 'none',
      textDecorationStyle: 'double',
      textDecorationColor: 'hsl(227.6,15.2%,62.5%)',
    },
  },
});

export default function Blog({ data }) {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <Layout>
      <SEO title="Johan's Blog" />
      <div>
        {posts
          .filter(post => post.node.frontmatter.title.length > 0)
          .map(({ node: post }) => (
            <div className={css(styles.post__container)} key={post.id}>
              <p className={css(styles.date__text)}>{post.frontmatter.date}</p>
              <h1>
                <Link
                  className={css(styles.link__text)}
                  to={post.frontmatter.path}
                >
                  {post.frontmatter.title}
                </Link>
              </h1>
              <p>{post.excerpt}</p>
            </div>
          ))}
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`;

Blog.propTypes = {
  data: PropTypes.shape().isRequired,
};
