/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import tw from 'twin.macro';
import Header from '../header';
import './layout.css';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    margin: '0 auto',
    padding: '0 1.0875rem 1.45rem',
    maxWidth: 960,
  },
  container__content: {
    flex: '1',
    padding: '0 1.0875rem 1.45rem',
  },
  footer: tw`text-center pb-6`,
});

const Layout = ({ children }) => (
  <>
    <div className={css(styles.container)}>
      <Header />
      <div className={css(styles.container__content)}>
        <main>{children}</main>
      </div>
      <footer className={css(styles.footer)}>
        ©&nbsp;
        {new Date().getFullYear()}, Johan Oakes
      </footer>
    </div>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
