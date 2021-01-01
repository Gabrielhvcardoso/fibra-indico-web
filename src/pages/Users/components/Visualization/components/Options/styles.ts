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

export const PassModal = styled(motion.div).attrs({
  onMouseDown: e => e.stopPropagation(),
  initial: { opacity: 0, translateY: -50 },
  animate: { opacity: 1, translateY: 0 },
  exit: { opacity: 0, translateY: 50 },
  transition: {
    type: 'spring',
    damping: 32,
    stiffness: 500
  }
})`
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const TextInput = styled.input`
  background-color: #eee;
  border-radius: 4px;
  border: none;
  font-family: 'WorkSans', sans-serif;
  font-size: 19px;
  height: 40px;
  padding: 0px 15px;
  width: 300px;
`;

export const Button = styled.button`
  background-color: #2b7ed722;
  border: none;
  color: #2b7ed7;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  padding: 10px 0px;
`;
