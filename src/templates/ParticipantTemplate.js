import React from 'react';
import {graphql} from 'gatsby';
import Layout from '../components/Layout';
import css from '@emotion/css';
import styled from '@emotion/styled';

const avatarCss = css`
  border-radius: 50%;
  width: 200px;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 35px;
`;


export default function ParticipantTemplate({
  data: {
    participantsJson,
    file: {
      publicURL: avatarURL
    }
  }}) {

  const {
    fullName,
    socialNetwork,
  } = participantsJson;

  return (
    <Layout>
      <FlexRow>
        <img css={avatarCss} src={avatarURL} />
        <FlexColumn>
          <h1 css={css`margin-top: 10px`}>{fullName}</h1>
          <div>
            BIO AQUI
          </div>
        </FlexColumn>
      </FlexRow>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ParticipantById($participantId: String!) {
    participantsJson(fields: {participantId: {eq: $participantId}}) {
      fullName
      socialNetwork
    }
    
    file(sourceInstanceName: {eq: "avatars"}, name: {eq: $participantId}) {
      publicURL
    }
  }
`;
