import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  background-color: #f2f2f2;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  justify-content: center;
  max-height: 90vh;
  padding: 30px;
  position: relative;
`;

export const IndicatedTag = styled.div`
  background-color: #2B7ED7;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  left: 20px;
  padding: 5px 10px;
  position: absolute;
  top: 20px;
`;
