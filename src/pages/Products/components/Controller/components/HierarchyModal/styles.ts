import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled(motion.div).attrs({
  initial: { translateY: -50, opacity: 0 },
  animate: { translateY: 0, opacity: 1 },
  exit: { translateY: 50, opacity: 0 },
  onMouseDown: e => e.stopPropagation()
})`
  background-color: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 95%;
  max-width: 95%;
  padding: 30px 40px;
`;

// Create

export const Heading = styled.p`
  color: black;
  display: block;
  font-size: 20px;
  margin: 0px;
  text-shadow: none;
`;

interface PorcentageTextInputProps {
  error?: boolean;
}

export const PorcentageTextInput = styled.input.attrs({
  type: 'number',
  min: 0,
  max: 100
})<PorcentageTextInputProps>`
  border: none;
  border-bottom: 1px solid ${p => p.error ? 'red' : 'black'};
  color: ${p => p.error ? 'red' : 'black'};
  font-size: 34px;
  margin-top: 20px;

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const Helper = styled(motion.p).attrs({
  initial: { translateY: -30, opacity: 0 },
  animate: { translateY: 0, opacity: 1 },
  exit: { translateY: -5, opacity: 0 },
  transition: {
    type: 'spring',
    damping: 10,
    stiffness: 100
  }
})`
  color: red;
  font-size: 14px;
  height: 14px;
  margin: 5px 0px 0px;
`;

export const ConffirmButton = styled(motion.div).attrs({
  initial: { translateX: -20, opacity: 0 },
  animate: { translateX: 0, opacity: 1 },
  exit: { translateX: 20, opacity: 0 }
})`
  align-items: center;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  height: 40px;
  justify-content: center;
  width: 40px;

  margin-top: -55px;
`;

// Edit

export const TextInput = styled.input`
  background-color: #f2f2f2;
  border-radius: 4px;
  height: 30px;
  width: 30px;

`;
