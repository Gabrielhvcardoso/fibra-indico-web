import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled(motion.div).attrs({
  initial: { translateY: -50, opacity: 0 },
  animate: { translateY: 0, opacity: 1 },
  exit: { translateY: 50, opacity: 0 }
})`
  background-color: white;
  box-sizing: border-box;
  padding: 20px;

  height: 400px;
  width: 600px;
`;
