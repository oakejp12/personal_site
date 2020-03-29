import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { useStaticQuery, graphql, Link } from 'gatsby';

/*
* Visit https://www.gatsbyjs.org/docs/static-query/#how-staticquery-differs-from-page-query
* to see the consideration for using Gatsby's new React Hook useStaticQuery and collocating
* the component with its data instead of passing it down.
*/

const styles = StyleSheet.create({
  mb: {
    marginBottom: '1.45em'
  },
  div: {
    margin: '0 auto',
    maxWidth: 960,
    padding: '1.45rem 1.0875rem',
  },
});

const Header = ({ data }) => (
  <header className={css(styles.mb)}>
    <div className={css(styles.div)}>
      {/* TODO: h1 tag should be swapped for my logo */}
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'rebeccapurple',
            textDecoration: 'none',
          }}
        >
          {data.site.siteMetadata.title}
        </Link>
      </h1>
    </div>
  </header>
);

export default () => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <Header data={data} />
  );
};

Header.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};
