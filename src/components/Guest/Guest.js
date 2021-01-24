import React, { Component } from 'react';

import deadpilot from './deadpilot.png';
import hayrucker from './hayrucker.jpg';
import css from '@emotion/css';

const guests = {
  deadpilot,
  hayrucker
};

export default class Guest extends Component {
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
          alt={name}
          src={guests[name]}
          css={css`
            border-radius: 50%;
            width: 100px;
            margin: 0 0 10px;
          `}
        />
        <p css={css`
          margin: 0;
        `}>@{name}</p>
      </a>
    );
  }
}