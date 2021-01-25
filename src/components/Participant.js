import React, { Component } from 'react';

import css from '@emotion/css';

export default class Guest extends Component {
  render() {
    const { displayName, socialNetwork, avatarUrl } = this.props;

    const avatarAndName = (
      <>
        <img
          alt={displayName}
          src={avatarUrl}
          css={css`
            border-radius: 50%;
            width: 100px;
            margin: 0 0 10px;
          `}
        />
        <p css={css`
          margin: 0;
        `}>
          {displayName}
        </p>
      </>
    );

    if (socialNetwork) {
      return (
        <a
          href={socialNetwork}
          target="_blank"
          rel="noopener noreferrer"
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            box-shadow: none;
            & + & {
              margin-left: 30px;
            }
            &:hover {
              text-decoration: underline;
            }
          `}
        >
          {avatarAndName}
        </a>
      );
    }

    return (
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: none;
          & + & {
            margin-left: 30px;
          }
        `}
      >
        {avatarAndName}
      </div>
    );
  }
}