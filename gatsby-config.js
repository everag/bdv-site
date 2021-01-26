const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Barra de Vida',
    description:
        'Um podcast brasileiro sobre videogames! Falamos sobre jogos recentes e antigos e contamos o que sentimos jogando, com bom humor e (quase) sem favoritismos! Por Everton Agner, Tarik Reis, Gilberto Lecci e Laureano.',
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
        path: path.join(__dirname, 'data', 'episodes'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'participants',
        path: path.join(__dirname, 'data', 'participants'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'avatars',
        path: path.join(__dirname, 'data', 'avatars'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'thumbnails',
        path: path.join(__dirname, 'data', 'thumbnails'),
      },
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-offline',
    },
  ],
};

