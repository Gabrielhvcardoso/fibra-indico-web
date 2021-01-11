import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div).attrs({
  onMouseDown: e => e.stopPropagation()
})`
  background-color: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 500px;
  overflow-y: scroll;
  padding: 10px 25px;
  width: 500px;
  max-width: 95%;
`;

export const StatsBox = styled(motion.div)`
  background-color: #eee;
  font-size: 14px;
  margin-top: 10px;
  padding: 10px;
`;

export const StatsItem = styled(motion.div)`
  align-items: centercenter;
  display: flex;
  justify-content: space-between;
`;

export const LabelLine = styled.span`
  text-transform: uppercase;
`;
