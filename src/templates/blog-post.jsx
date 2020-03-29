import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Layout from '../components/Layout/layout';

// import '../css/blog-post.css'; // make it pretty!

export default function Template({ data }) {
  const { markdownRemark: post } = data; // data.markdownRemark holds the blog post data

  return (
    <Layout>
      <div className="blog-post-container">
        <Helmet title={`${post.frontmatter.title}`} />
        <div className="blog-post">
          <h1>{post.frontmatter.title}</h1>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
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
