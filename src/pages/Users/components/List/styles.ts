import styled from 'styled-components';

export const Container = styled.div`
  background-color: #00000011;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 90vh;
  overflow-y: auto;
  min-width: 20vw;
  width: 20vw;
`;

export const ListItem = styled.div`
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 15px 25px;

  &:hover {
    background-color: #00000011;
  }
`;
