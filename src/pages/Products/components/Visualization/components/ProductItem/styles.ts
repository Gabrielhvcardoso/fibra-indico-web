import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled(motion.div).attrs({
  whileHover: {
    scale: 1.02,
    transition: {
      type: 'spring',
      damping: 10,
      stiffness: 100
    }
  }
})`
  background-color: white;
  border-radius: 10px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  margin: 10px;
  padding: 10px;
  width: calc(20% - 20px);

  @media (max-width: 1366px) {
    width: calc(25% - 20px);
  }

  @media (max-width: 768px) {
    width: calc(50% - 20px);
  }

  &:hover {
    transform: scale(1.1);
  }
`;

export const Title = styled.p`
  margin: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const Commission = styled.p`
  margin: 0px;
`;
