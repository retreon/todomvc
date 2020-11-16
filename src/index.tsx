import React from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Provider as StoreProvider } from 'react-redux';

import App from './components/App';
import store from './utils/redux-store';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  * {
    box-sizing: border-box;
  }
`;

const ThemeProvider = styled.div`
  --color-background: #f5f5f5;
  --color-primary: rgb(175, 47, 47);
  --color-primary-light: rgba(175, 47, 47, 0.2);
  --color-primary-lighter: rgba(175, 47, 47, 0.15);
  --color-secondary: #5dc2af;
  --color-text: #4d4d4d;
  --color-text-light: #777;
  --color-text-lighter: #bfbfbf;
  --color-text-lightest: #e6e6e6;
  --color-neutral: white;
  --color-divider: #00000018;

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
