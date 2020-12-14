import styled from 'styled-components';

export const Container = styled.aside`
  align-items: center;
  background-color: white;
  box-shadow: 0px 0px 20px #00000033;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  left: 0px;
  position: absolute;
  transition: .6s;
  top: 0px;
  width: 60px;

  transform: translateX(-50px);

  &:hover {
    transform: translateX(0px);
  }
`;

export const IconButton = styled.div`
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
