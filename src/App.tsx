import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: var(--color-background);
  color: var(--color-text);
  font: var(--font);
  line-height: 1.4rem;
  display: flex;
  min-height: 100vh;
  justify-content: center;
`;

const Todos = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: calc(var(--unit) * 70);
`;

const Heading = styled.h1`
  color: var(--color-title);
  font-weight: 100;
  font-size: 100px;
  line-height: normal;
  text-align: center;
  margin: var(--unit) 0;
  text-rendering: optimizeLegibility;
`;

export default function App() {
  return (
    <Container>
      <Todos>
        <Heading>todos</Heading>
      </Todos>
    </Container>
  );
}
