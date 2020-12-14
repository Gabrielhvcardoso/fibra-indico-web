import styled from 'styled-components';

export const Container = styled.aside`
  align-items: center;
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  transition: .6s;
  width: 60px;
`;

export const IconButton = styled.div`
  color: black;
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
`;

interface IndicatorProps {
  position?: number;
}

export const Indicator = styled.div<IndicatorProps>`
  background-color: #2b7ed7;
  height: 60px;
  position: absolute;
  width: 5px;
  transition: .6s;

  transform: translateY(${props => props.position ?? 0}px);
`;
