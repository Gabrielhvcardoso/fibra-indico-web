import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div).attrs({
  initial: { backgroundColor: 'rgba(0, 0, 0, 0)' },
  animate: { backgroundColor: 'rgba(0, 0, 0, 0.6)' },
  exit: { backgroundColor: 'rgba(0, 0, 0, 0)' }
})`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
