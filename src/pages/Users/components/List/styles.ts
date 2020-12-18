import styled from 'styled-components';

export const Container = styled.div`
  background-color: #00000011;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 90vh;
  overflow-y: auto;
  min-width: 20vw;
  width: 20vw;
`;

interface ListItemProps {
  selected?: boolean,
  disabled?: boolean,
}

export const ListItem = styled.div<ListItemProps>`
  cursor: pointer;
  color: ${props => props.disabled ? 'red' : 'black'};
  background-color: ${props => props.selected ? '#00000011' : '#00000000'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 15px 25px;

  &:hover {
    background-color: ${props => props.selected ? '#00000022' : '#00000011'};
  }
`;
