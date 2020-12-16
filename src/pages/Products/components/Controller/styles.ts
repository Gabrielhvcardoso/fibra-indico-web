import styled from 'styled-components';

export const Container = styled.aside`
  background-color: #00000011;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 10px 10px;
  height: 90vh;
  width: 20vw;
`;

export const Button = styled.button`
  background-color:  transparent;
  border: none;
  color: #2b7ed7;
  cursor: pointer;
  height: 50px;
  margin-bottom: 5px;
  text-transform: uppercase;

  &:hover {
    background-color: #ffffff22;
  }
`;
