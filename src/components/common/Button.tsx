import styled from 'styled-components';

const Button = styled.button`
  appearance: none;
  background: transparent;
  border: none;
  padding: 0;
  font-size: inherit;

  :focus {
    outline: 1px dashed currentColor;
  }
`;

export default Button;
