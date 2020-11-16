import React from 'react';
import styled from 'styled-components';

import TodoInput from './TodoInput';
import ListView from './ListView';

export default function App() {
  return (
    <Container>
      <Tasks>
        <Title>todos</Title>

        <ListSection>
          <TodoInput />
          <ListView />
        </ListSection>

        <Footer>
          <FooterNote>Double-click to edit a todo</FooterNote>
          <FooterNote>
            Built with{' '}
            <Link href="https://github.com/retreon/retreon">retreon</Link>
          </FooterNote>
          <FooterNote>
            Modeled after{' '}
            <Link href="http://todomvc.com/" target="_blank">
              TodoMVC
            </Link>
          </FooterNote>
        </Footer>
      </Tasks>
    </Container>
  );
}

const Container = styled.div`
  background-color: var(--color-background);
  color: var(--color-text);
  font: var(--font);
  line-height: 1.4rem;
  display: flex;
  min-height: 100vh;
  justify-content: center;
`;

const Tasks = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: calc(var(--unit) * 70);
`;

const Title = styled.h1`
  color: var(--color-title);
  font-weight: 100;
  font-size: calc(var(--unit) * 12.5);
  line-height: normal;
  text-align: center;
  margin: var(--unit) 0;
  text-rendering: optimizeLegibility;
`;

const ListSection = styled.section`
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: calc(var(--unit) * 8);
`;

const FooterNote = styled.p`
  margin: 0;
  color: var(--color-text-light);
  font-size: x-small;

  :first-child {
    margin-top: 0;
  }

  :last-child {
    margin-bottom: 0;
  }
`;

const Link = styled.a`
  color: inherit;
  text-decoration: none;
  font-weight: 500;

  :focus,
  :hover {
    text-decoration: underline;
  }
`;
