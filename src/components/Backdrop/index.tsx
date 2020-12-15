import React from 'react';
import { Portal } from 'react-portal';
import { Container } from './styles';

interface BackdropProps {
  onMouseDown?: () => void,
  onMouseUp?: () => void,
  onMouseMove?: () => void,
  onClick?: () => void
}

const Backdrop: React.FC<BackdropProps> = (props) => {
  return (
    <Portal>
      <Container {...props} />
    </Portal>
  );
};

export default Backdrop;
