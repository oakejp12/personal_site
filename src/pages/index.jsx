import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout/layout';
import SEO from '../components/seo';
// import Image from "../components/image";

export default function IndexPage({ data }) {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <Layout>
      <SEO title="Home" />
      <div className="blog-posts">
        {posts
          .filter((post) => post.node.frontmatter.title.length > 0)
          .map(({ node: post }) => (
            <div className="blog-post-preview" key={post.id}>
              <h1>
                <Link to={post.frontmatter.path}>
                  {post.frontmatter.title}
                </Link>
              </h1>
              <h2>{post.frontmatter.date}</h2>
              <p>{post.excerpt}</p>
            </div>
          ))}
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query IndexQuery {
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
