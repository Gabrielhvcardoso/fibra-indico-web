import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled(motion.div).attrs({
  onMouseDown: e => e.stopPropagation(),
  initial: { translateY: -50, opacity: 0 },
  animate: { translateY: 0, opacity: 1 },
  exit: { translateY: 50, opacity: 0 }
})`
  background-color: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const Title = styled.p`
  font-size: 18px;
`;

interface TextInputProps {
  mini?: boolean
}

export const TextInput = styled.input<TextInputProps>`
  background-color: #f2f2f2;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  height: 50px;
  margin-bottom: 20px;
  padding: 0px 10px;
  width: ${props => props.mini ? '200px' : '550px'};
`;

export const Button = styled.button`
  background-color: #00000011;
  color: #000000;
  cursor: pointer;
  border: none;
  font-weight: 500;
  height: 50px;
  text-transform: uppercase;
  transition: .2s;

  &:hover {
    background-color: #00000022;
  }
`;
