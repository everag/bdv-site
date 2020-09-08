import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import logoImage from '../images/bdv-logo-square.jpeg';

const twitterHandle = '@BarraDeVida';

export default function SEO({
  title: titleProp,
  description: descriptionProp,
  postSlug,
  image: imageProp,
  isBlogPost,
}) {
  return (
    <StaticQuery
      query={graphql`
        query LayoutData {
          site {
            siteMetadata {
              title
              description
              siteUrl
              keywords
            }
          }
        }
      `}
      render={({ site: { siteMetadata } }) => {
        const title = titleProp || siteMetadata.title;
        const description = descriptionProp || siteMetadata.description;
        const image = `${siteMetadata.siteUrl}${imageProp || logoImage}`;
        let url = siteMetadata.siteUrl;
        if (postSlug) {
          url += postSlug;
        }
        return (
          <Helmet
            title={siteMetadata.title}
            titleTemplate={`%s | ${siteMetadata.title}`}
          >
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta name="keywords" content={siteMetadata.keywords} />
            {/* The real MVP: https://moz.com/blog/meta-data-templates-123 */}
            <title>{title}</title>
            <meta name="description" content={description} />
            {/* <!-- Twitter Card data --> */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={twitterHandle} />
            <meta name="twitter:creator" content={twitterHandle} />
            {/* <!-- Open Graph data --> */}
            {isBlogPost && <meta property="og:type" content="article" />}
            <meta property="og:title" content={title} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />
            <meta property="og:image:type" content="image/jpeg" />
            <meta property="og:image:alt" content="Logo: Barra de Vida" />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content={siteMetadata.title} />
          </Helmet>
        );
      }}
    />
  );
}
