const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Barra de Vida',
    description:
        'Um podcast brasileiro sobre videogames, onde falamos tanto sobre jogos antigos quanto novos, ' +
        'cobrimos praticamente todas as plataformas atuais, e contamos o que sentimos jogando, com bom ' +
        'humor e (quase) sem favoritismos!',
    siteUrl: 'https://barradevida.com.br',
    keywords: 'podcast, video-games, videogames, games, jogos',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography.js',
      },
    },
    {
      resolve: 'gatsby-plugin-prefetch-google-fonts',
      options: {
        fonts: [
          {
            family: 'Bangers',
          },
          {
            family: 'Press Start 2P',
          },
        ],
      },
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    // TODO: Configure Analytics for the website
    // {
    //   resolve: 'gatsby-plugin-google-analytics',
    //   options: {
    //     trackingId: 'UA-107877562-1', // theconsolelog value
    //   },
    // },
    'gatsby-plugin-sharp',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'episodes',
        path: path.join(__dirname, 'episodes'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'thumbnails',
        path: path.join(__dirname, 'thumbnails'),
      },
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-offline',
    },
  ],
};

