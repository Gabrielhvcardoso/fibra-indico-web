import styled from 'styled-components';
import { NavLink as RouterNavLink, NavLinkProps as RouterNavLinkProps } from 'react-router-dom';

export const Container = styled.aside`
  align-items: center;
  background-color: white;
  box-sizing: border-box;
  display: flex;
  height: 60px;
  justify-content: flex-end;
  padding: 0px 30px;
  width: 100vw;

  @media (max-width: 768px) {
    position: absolute;
    height: 60px;
    width: 100vw;
    flex-direction: row;
    bottom: 0px;
  }
`;

export const Nav = styled.nav`
  display: flex;
  position: relative;
`;

interface NavLinkProps extends RouterNavLinkProps {
  selected?: boolean;
}

export const NavLink = styled(RouterNavLink)<NavLinkProps>`
  color: ${props => props.selected ? '#2b7ed7' : 'grey'};
  margin: 0px 15px;
  text-decoration: none;
`;
