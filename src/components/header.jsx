import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'gatsby';
import tw from 'twin.macro';

/*
 * Visit https://www.gatsbyjs.org/docs/static-query/#how-staticquery-differs-from-page-query
 * to see the consideration for using Gatsby's new React Hook useStaticQuery and collocating
 * the component with its data instead of passing it down.
 */

const styles = StyleSheet.create({
  header__mb: tw`mb-6`,
  div: tw`mx-auto my-0 max-w-screen-lg py-8 px-4`,
  nav__item: tw`inline-block mr-4`,
  nav__list: tw`list-none float-right`,
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

export default function Header() {
  return (
    <header className={css(styles.header__mb)}>
      <div className={css(styles.div)}>
        <InternalLink to="/">
          <h3 style={{ display: 'inline' }}>johan</h3>
        </InternalLink>
        <ul className={css(styles.nav__list)}>
          <InternalLink to="/blog">blog</InternalLink>
          <ExternalLink to="https://github.com/oakejp12" name="github" />
          <ExternalLink
            to="https://linkedin.com/in/johanoakes"
            name="linkedin"
          />
        </ul>
      </div>
    </header>
  );
}
