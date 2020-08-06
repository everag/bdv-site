import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../components/Layout';
import EpisodeListItem from '../components/EpisodeListItem';
import Host from '../components/Host';
import Disqus from '../components/Disqus';
import SEO from '../components/SEO';
import { css } from '@emotion/core';

export default function EpisodeTemplate({ data: { episodesJson } }) {
  const {
    title,
    description,
    embedded,
    fields: { episodeNumber, slug },
    hosts,
    content,
  } = episodesJson;

  return (
    <Layout>
      <Helmet title={`E${episodeNumber}: ${title}`} />
      <SEO
        title={title}
        description={`Episódio: ${episodeNumber}`}
        postSlug={slug}
        isBlogPost
      />
      <EpisodeListItem {...episodesJson} linked={false} />
      <p>
        {description}
      </p>
      <iframe
        src={embedded}
        height="100%"
        width="100%"
        frameBorder="0"
        scrolling="no"
        css={{margin:0}}>
      </iframe>
      <h2>Hosts</h2>
      <div
        css={css`
          display: flex;
          flex-direction: row;  
        `}
      >
        {hosts.map(name => (
          <Host key={name} name={name} />
        ))}
      </div>
      {content?.length !== 0 && (
        <>
          <h2>Links do Episódio</h2>
          <Links content={content} />
        </>
      )}
      <Disqus />
    </Layout>
  );
}

const Links = ({ content }) => (
  <ul>
    {content.map(({ name, links }) => (
      <li key={name}>
        {name}
        <ul>
          {links.map(link => (
            <li key={link}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </li>
    ))}
  </ul>
);

export const pageQuery = graphql`
  query EpisodeByNumber($episodeNumber: String!) {
    episodesJson(fields: { episodeNumber: { eq: $episodeNumber } }) {
      title
      description
      embedded
      fields {
        episodeNumber
        slug
      }
      date {
        start
      }
      hosts
      content {
        name
        links
      }
    }
  }
`;
