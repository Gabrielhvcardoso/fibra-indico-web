import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 25px;
  overflow: auto;

  @media (max-width: 768px) {
    padding-bottom: 70px;
  }
`;

export const CanvasNav = styled.nav`
  align-self: flex-start;
  background-color: #ddd;
  border-radius: 25px;
  display: flex;
  height: 50px;
  margin-bottom: 10px;
`;

export const Canvas = styled.div`
  display: flex;
  flex: 1;
`;

export const NavItem = styled.div`
  align-items: center;
  display: flex;
  height: 50px;
  padding: 0px 25px;
  position: relative;
`;

export const NavSelect = styled.div`
  background-color: #00000011;
  border-radius: 25px;
  position: absolute;
  top: 0; left:0; right: 0; bottom: 0;
`;
