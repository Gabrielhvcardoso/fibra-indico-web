import { motion } from 'framer-motion';
import styled from 'styled-components';
import bg from '../assets/bg.jpg';

export const Container = styled.div`
  align-items: center;
  background: url(${bg});
  background-size: cover;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

export const TextInput = styled.input`
  height: 40px;
  width: 300px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 0px 15px;
`;

export const Button = styled(motion.div).attrs({
  initial: { translateX: -20, opacity: 0 },
  animate: { translateX: 0, opacity: 1 },
  exit: { translateX: 20, opacity: 0 }
})`
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  height: 40px;
  justify-content: center;
  left: calc(50vw + 125px);
  position: absolute;
  top: calc(50vh - 15px);
  width: 40px;
`;
