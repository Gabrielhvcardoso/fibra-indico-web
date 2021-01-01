import styled from 'styled-components';

export const Container = styled.div`
    flex: 1;
    background-color: #eee;
`;

export const ListItem = styled.div`
  align-items: center;
  color: black;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding: 15px 25px;

  &:hover {
    background-color: #00000011;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
