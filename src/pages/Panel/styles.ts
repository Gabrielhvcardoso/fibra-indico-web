import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 50px;

  @media (max-width: 768px) {
    padding-bottom: 70px;
  }
`;

export const List = styled.section`
  background-color: #eee;
  flex: 1;
  overflow-y: auto;
`;

export const ListButtons = styled.div`
  height: 50px;
  display: flex;
`;

export const Button = styled.button`
  align-items: center;
  border: none;
  background-color: #ddd;
  cursor: pointer;
  display: flex;
  flex: 1;
  height: 50px;
  justify-content: center;
  text-transform: uppercase;

  &:hover {
    background-color: #00000022;
  }
`;
