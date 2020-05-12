import React from 'react';
import styled from '@emotion/styled';
import { layout } from '../utils/constants';

export default () => (
  <Container>
    Um podcast brasileiro sobre videogames, onde falamos tanto sobre jogos antigos quanto novos,
    cobrimos praticamente todas as plataformas atuais, e contamos o que sentimos jogando, com bom
    humor e (quase) sem favoritismos! Na série Sidecast, falamos de forma mais solta e rápida sobre
    assuntos do momento.
  </Container>
);

const Container = styled('aside')`
  max-width: ${layout.width}px;
  margin: 0 auto;
  border-radius: 4px;
  padding: 1.2rem 1.1rem;
  background: #dad8d8;
  box-shadow: 0px 1px 2px 0px #797b84;
`;
