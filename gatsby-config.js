module.exports = {
  siteMetadata: {
    title: 'Johan Oakes',
    description:
      'Personal site of Johan Oakes - includes blogs, links, pictures, etc.',
    author: 'Johan Oakes',
  },
  plugins: [
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-prismjs',
            options: {},
          },
        ],
      },
    },
  ],
};
