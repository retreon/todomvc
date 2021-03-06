import styled from 'styled-components';

const Button = styled.button.attrs({ type: 'button' })`
  appearance: none;
  background: transparent;
  border: none;
  padding: 0;
  font-size: inherit;
  font-weight: inherit;
  color: inherit;

  :focus {
    outline: 1px dashed currentColor;
  }
`;

export default Button;
