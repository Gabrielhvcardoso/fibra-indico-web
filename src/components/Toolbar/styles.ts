import styled from 'styled-components';

export const Container = styled.aside`
  align-items: center;
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  width: 60px;

  @media (max-width: 768px) {
    position: absolute;
    height: 60px;
    width: 100vw;
    flex-direction: row;
    bottom: 0px;
  }
`;

export const IconButton = styled.div`
  color: black;
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  
  @media (max-width: 768px) {
    width: 90px;
  }
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

interface IndicatorProps {
  position?: number;
}

export const Indicator = styled.div<IndicatorProps>`
  background-color: #2b7ed7;
  height: 60px;
  position: absolute;
  width: 5px;
  transition: .6s transform;

  transform: translateY(${props => (props.position ?? 0) * 60}px);

  @media (max-width: 768px) {
    transform: translateX(${props => (props.position ?? 0) * 90}px);
    width: 90px;
    height: 5px;
  }
`;
