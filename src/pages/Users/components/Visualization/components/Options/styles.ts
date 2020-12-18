import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Close = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
`;

export const FloatingButton = styled(motion.div)`
  align-items: center;
  background-color: #2b7ed7;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  height: 50px;
  justify-content: center;
  position: absolute;
  right: 20px;
  top: calc(10vh + 20px);
  width: 50px;
`;

export const Container = styled(motion.div).attrs({
  onMouseDown: e => e.stopPropagation(),
  transition: {
    type: 'spring',
    damping: 32,
    stiffness: 500
  }
})`
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 25px 0px;
  position: absolute;
  right: 20px;
  top: calc(10vh + 20px);
  transform-origin: top center;
  width: 250px;
`;

export const MenuItem = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 40px;
  justify-content: center;

  &:hover {
    background-color: #00000011;
  }
`;
