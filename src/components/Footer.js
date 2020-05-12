import React from 'react';
import styled from '@emotion/styled';
import { layout } from '../utils/constants';
import css from '@emotion/css';

export default () => (
  <Footer>
    <Left>Gueimers Podcast</Left>
    <Right>
      <span>Novos Episódios todo Sábado!</span>
      <Bullet />
      <a
        href="https://github.com/hswolff/theconsolelog"
        target="_blank"
        rel="noopener noreferrer"
      >
        Forked from @theconsolelog
      </a>
    </Right>
  </Footer>
);

const Footer = styled('div')`
  max-width: ${layout.width}px;
  margin: 0 auto;
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 0.7rem;
  border-top: 1px solid #232121;
`;

const Left = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Right = styled('div')``;

const Bullet = () => (
  <span
    css={css`
      display: inline-block;
      margin: 0 10px;
    `}
  >
    &bull;
  </span>
);
