import React from 'react';
import {graphql} from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../components/Layout';
import EpisodeListItem from '../components/EpisodeListItem';
import Participant from '../components/Participant';
import Disqus from '../components/Disqus';
import SEO from '../components/SEO';
import {css} from '@emotion/core';

const Links = ({content}) => (
  <ul>
    {content.map(({name, links}) => (
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

export default function EpisodeTemplate({data: {episodesJson, allParticipantsJson, file, allFile}}) {
  const {
    title,
    description,
    embedded,
    fields: {episodeNumber, slug},
    hosts,
    guests,
    content,
  } = episodesJson;

  console.log(allParticipantsJson);

  const participants = {};
  allParticipantsJson.edges.forEach(({node}) => {
    const id = node.fields.participantId;
    const avatarUrl = allFile.edges.map(edge => edge.node).find(({name}) => name === id).publicURL;
    participants[id] = {...node, avatarUrl};
  });

  const {
    publicURL: image
  } = file ?? {};

  return (
    <Layout>
      <Helmet title={`E${episodeNumber}: ${title}`}/>
      <SEO
        title={title}
        description={`Episódio: ${episodeNumber}`}
        postSlug={slug}
        image={image}
        isBlogPost
      />
      <EpisodeListItem {...episodesJson} linked={false}/>
      <p>
        {description}
      </p>
      <iframe
        src={embedded}
        frameBorder="0"
        scrolling="no"
        css={{margin: 0, height: 161, width: '100%'}}>
      </iframe>
      <h2>Hosts</h2>
      <div
        css={css`
          display: flex;
          flex-direction: row;
        `}
      >
        {hosts.map(host => participants[host]).map(participant => (
          <Participant key={participant} {...participant} />
        ))}
      </div>
      {guests && (
        <>
          <h2>Participação Especial</h2>
          <div
            css={css`
              display: flex;
              flex-direction: row;
            `}
          >
            {guests.map(guest => participants[guest]).map(participant => (
              <Participant key={participant} {...participant} />
            ))}
          </div>
        </>
      )}
      {content?.length !== 0 && (
        <>
          <h2>Links do Episódio</h2>
          <Links content={content}/>
        </>
      )}
      <Disqus identifier={slug} url={`episode/${episodeNumber}`}/>
    </Layout>
  );
}

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
      guests
      content {
        name
        links
      }
    }
    allParticipantsJson {
      edges {
        node {
          fields {
            participantId
          }
          displayName
          fullName
          socialNetwork
        }
      }
    }
    allFile(filter: {sourceInstanceName: {eq: "avatars"}}) {
      edges {
        node {
          publicURL
          name
        }
      }
    }
    file(sourceInstanceName: {eq: "thumbnails"}, name: {eq: $episodeNumber}){
      publicURL
    }
  }
`;
