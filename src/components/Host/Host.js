import React, { Component } from 'react';
import ertonnnn from './ertonnnn.jpg';
import tarikingsbr from './tarikingsbr.jpg';
import andrexbts from './andrexbts.jpg';
import law_reano from './law_reano.jpg';
import tiobertogueimer from './tiobertogueimer.jpg';
import css from '@emotion/css';

const hosts = {
  ertonnnn,
  tarikingsbr,
  andrexbts,
  law_reano,
  tiobertogueimer,
};

export default class Host extends Component {
  render() {
    const { name } = this.props;
    return (
      <a
        href={`https://twitter.com/${name}`}
        target="_blank"
        rel="noopener noreferrer"
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: none;
          &:hover {
            text-decoration: underline;
          }
          & + & {
            margin-left: 30px;
          }
        `}
      >
        <img
          src={hosts[name]}
          css={css`
            border-radius: 50%;
            width: 100px;
            margin: 0;
            margin-bottom: 10px;
          `}
        />
        <p css={css({ margin: 0 })}>@{name}</p>
      </a>
    );
  }
}
