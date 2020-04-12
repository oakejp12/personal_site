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
  header__mb: {
    marginBottom: '1.45em',
  },
  div: {
    margin: '0 auto',
    maxWidth: 960,
    padding: '1.45rem 1.0875rem',
  },
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
  nav__item: {
    display: 'inline-block',
    marginRight: '1rem',
  },
  nav__list: {
    listStyle: 'none',
    float: 'right',
  },
});

const InternalLink = ({ to, children }) => (
  <li className={css(styles.nav__item)}>
    <Link to={to} className={css(styles.link__text)}>
      {children}
    </Link>
  </li>
);

InternalLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const ExternalLink = ({ to, name }) => (
  <li className={css(styles.nav__item)}>
    <a
      className={css(styles.link__text)}
      href={to}
      rel="noopener noreferrer"
      target="_blank"
    >
      {name}
    </a>
  </li>
);

ExternalLink.propTypes = {
  to: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const Header = ({ data }) => (
  <header className={css(styles.header__mb)}>
    <div className={css(styles.div)}>
      <InternalLink to="/">
        <h3 style={{ display: 'inline' }}>{data.site.siteMetadata.title}</h3>
      </InternalLink>
      <ul className={css(styles.nav__list)}>
        <InternalLink to="/blog">blog</InternalLink>
        <ExternalLink to="https://github.com/oakejp12" name="github" />
        <ExternalLink to="https://linkedin.com/in/johanoakes" name="linkedin" />
      </ul>
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

  return <Header data={data} />;
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
