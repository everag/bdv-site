module.exports = {
  siteMetadata: {
    title: 'The Console Log',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography.js',
      },
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-107877562-1',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-plugin-catch-links',
  ],
};
