import { motion } from 'framer-motion';
import styled from 'styled-components';

export const CanvasNav = styled.nav`
  align-self: flex-start;
  background-color: #ddd;
  border-radius: 25px;
  display: flex;
  height: 50px;
  margin-bottom: 10px;
`;

interface NavItemProps {
  selected?: boolean;
}

export const NavItem = styled(motion.div)<NavItemProps>`
  align-items: center;
  color: black;
  cursor: pointer;
  display: flex;
  height: 50px;
  padding: 0px 25px;
  position: relative;
`;

export const NavSelect = styled(motion.div).attrs({
  transition: {
    type: 'spring',
    damping: 32,
    stiffness: 500
  }
})`
  align-items: center;
  display: flex;
  background-color: #ffffff;
  border-radius: 25px;
  justify-content: center;
  position: absolute;
  top: 0; left:0; right: 0; bottom: 0;
`;
