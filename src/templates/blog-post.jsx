import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Layout from '../components/Layout/layout';
import './blog-post.css';

export default function Template({ data }) {
  // data.markdownRemark holds the blog post data
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <div>
        <Helmet title={`${post.frontmatter.title}`} />
        <div>
          <h1>{post.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;

Template.propTypes = {
  data: PropTypes.shape().isRequired,
};
