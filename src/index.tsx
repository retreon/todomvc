import React from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Provider as StoreProvider } from 'react-redux';

import App from './App';
import store from './utils/redux-store';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    box-sizing: border-box;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }
`;

const ThemeProvider = styled.div`
  --color-background: #f5f5f5;
  --color-title: rgba(175, 47, 47, 0.15);
  --color-text: #4d4d4d;
  --color-text-light: #bfbfbf;

  --font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --unit: 0.5rem;
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <StoreProvider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
