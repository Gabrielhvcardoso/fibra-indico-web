import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div).attrs({
  initial: { opacity: 0, translateX: -100 },
  animate: { opacity: 1, translateX: 0 },
  exit: { opacity: 0, translateX: -100 }
})`
  background-color: white;
  box-shadow: 0px 0px 20px #00000033;
  border-radius: 10px;
  bottom: 20px;
  max-width: 300px;
  padding: 20px;
  position: absolute;
  right: 20px;
`;
