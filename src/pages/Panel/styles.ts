import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 0px 25px;

  @media (max-width: 768px) {
    padding-bottom: 70px;
  }
`;
