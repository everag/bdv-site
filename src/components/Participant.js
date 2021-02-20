import React, {Component} from 'react';

import { Link } from 'gatsby';
import css from '@emotion/css';

const linkCss = css`
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
`;

const avatarCss = css`
  border-radius: 50%;
  width: 100px;
  margin: 0 0 10px;
`;

export default class Participant extends Component {
  render() {
    const {displayName, avatarUrl, fields: {participantId}} = this.props;

    return (
      <Link
        to={`/sobre/${participantId}`}
        css={linkCss}>
        <img
          alt={displayName}
          src={avatarUrl}
          css={avatarCss}
        />
        {displayName}
      </Link>
    );
  }
}