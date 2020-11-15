import React from 'react';
import styled from 'styled-components';

export default function App() {
  return (
    <Container>
      <Todos>
        <Heading>todos</Heading>

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
      </Todos>
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

const Footer = styled.footer`
  text-align: center;
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
