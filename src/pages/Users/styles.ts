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
