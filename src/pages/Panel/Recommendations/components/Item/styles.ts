import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;

  &:hover {
    background-color: #00000011;
  }
`;

export const Text = styled.p`
  margin: 0;
`;

export const Button = styled.div`
  align-items: center;
  background-color: #f2f2f2;
  cursor: pointer;
  display: flex;
  height: 30px;
  padding: 0px 15px;
  justify-content: center;
`;
