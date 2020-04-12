import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import Header from '../header';
import './layout.css';

const styles = StyleSheet.create({
  container: {
    margin: '0 auto',
    maxWidth: 960,
    padding: '0 1.0875rem 1.45rem',
  },
});

const Layout = ({ children }) => (
  <>
    <Header />
    <div className={css(styles.container)}>
      <main>{children}</main>
      <footer>©{new Date().getFullYear()}, Johan Oakes</footer>
    </div>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
