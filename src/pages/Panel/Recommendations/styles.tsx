import { motion } from 'framer-motion';
import styled from 'styled-components';

export const TopButton = styled.div`
  background-color: #ddd;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
  padding: 10px 20px;
  &:hover {
    background-color: #d0d0d0;
  }
`;

export const Select = styled.select`
  background-color: #ddd;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;
  padding: 10px 20px;

  &:hover {
    background-color: #d0d0d0;
  }
`;

export const FloatingContainer = styled.div`
  align-items: center;
  display: flex;
  position: absolute;
  top: -50px;
`;

export const Button = styled.div`
  background-color: #eee;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
  padding: 10px 20px;

  &:hover {
    background-color: #ddd;
  }
`;

export const Container = styled(motion.div).attrs({
  initial: { translateY: -20, opacity: 0 },
  animate: { translateY: 0, opacity: 1 },
  exit: { translateY: -20, opacity: 0 },
  transition: {
    delayChildren: 0.3,
    staggerChildren: 0.2
  }
})`
  flex: 1;
  background-color: #eee;
  position: relative;
  margin-top: 50px;
`;

export const ListItem = styled.div`
  color: black;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding: 15px 25px;

  &:hover {
    background-color: #00000011;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Modal = styled(motion.div).attrs({
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
  padding: 20px 50px;
`;
