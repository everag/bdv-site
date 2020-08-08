import React from 'react';
import { Link } from 'gatsby';
import { DateTime } from 'luxon';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

export default ({
  linked = true,
  fields: { slug, episodeNumber },
  title,
  date,
}) => {
  return (
    <Container>
      <Dates>
        {formatDate(date.start)}
      </Dates>
      {linked ? (
        <h3 css={titleCss}>
          <Link to={slug}>{title}</Link>
        </h3>
      ) : (
        <h1 css={titleCss}>{title}</h1>
      )}

      <Subtitle>Episódio: {episodeNumber}</Subtitle>
    </Container>
  );
};

const Container = styled('div')`
  margin: 40px 0;
`;

const Dates = styled('div')`
  font-size: 0.88rem;
`;

const titleCss = css`
  margin: 0;
`;

const Subtitle = styled('span')`
  font-size: 0.8rem;
`;

function formatDate(date) {
  return DateTime.fromISO(date).setLocale('pt-BR').toLocaleString(DateTime.DATE_FULL);
}
