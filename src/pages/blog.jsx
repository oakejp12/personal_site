import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import { StyleSheet, css } from 'aphrodite';
import Layout from '../components/Layout/layout';
import SEO from '../components/seo';

/* TODO: Add a table of contents using graphql --> pageQuery */

const styles = StyleSheet.create({
  link__text: {
    textDecoration: 'none',
    color: 'hsl(220.7,26.4%,20.8%)',
    ':hover': {
      color: 'hsl(37.6,67.7%,80.6%)',
      textDecoration: 'underline',
      textDecorationStyle: 'double',
      textDecorationColor: 'hsl(227.6,15.2%,62.5%)',
    },
  },
  date__text: {
    color: '#bbb',
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
            <div key={post.id}>
              <h1>
                <Link
                  className={css(styles.link__text)}
                  to={post.frontmatter.path}
                >
                  {post.frontmatter.title}
                  <span className={css(styles.date__text)}>
                    {' '}
                    — {post.frontmatter.date}
                  </span>
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
