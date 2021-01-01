import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { User } from '../../../models/User';
import { Withdraw } from '../../../models/Withdraw';
import { currencyFormat } from '../../../utils';

type WithdrawOrder = Omit<Withdraw, 'fromUserToken'> & { user: User };

export const Container = styled(motion.div).attrs({
  initial: { translateY: -20, opacity: 0 },
  animate: { translateY: 0, opacity: 1 },
  exit: { translateY: -20, opacity: 0 },
  transition: {
    delayChildren: 0.3,
    staggerChildren: 0.2
  }
})`
  flex: 1;
  background-color: #eee;
`;

const ItemContainer = styled.div`
  color: black;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  padding: 15px 25px;

  &:hover {
    background-color: #00000011;
  }
`;

const resolveStatus = (status: string) => {
  switch (status) {
    case 'pending': return 'Pendente';
    case 'recused': return 'Recusado';
    case 'failed': return 'Com problemas';
    case 'done': return 'Finalizado';
    default: return 'Indefinido';
  }
};

export const WithdrawItem: React.FC<{ item: WithdrawOrder, onClick: () => void }> = ({ item, onClick }) => {
  return (
    <ItemContainer onClick={onClick}>
      <span>{ item.user.name } - <b style={{ color: 'blue' }}>{ currencyFormat(item.amount, true) }</b></span>
      <small>{ item.user.city } - { item.user.state }</small>
      <small><b style={{ color: 'blue' }}>{ resolveStatus(item.status) }</b> - há { formatDistanceToNow(parseInt(item.createdAt), { locale: ptBR }) }</small>
    </ItemContainer>
  );
};

export const Modal = styled(motion.div).attrs({
  onMouseDown: e => e.stopPropagation(),
  initial: { opacity: 0, translateY: -50 },
  animate: { opacity: 1, translateY: 0 },
  exit: { opacity: 0, translateY: 50 },
  transition: {
    type: 'spring',
    damping: 32,
    stiffness: 500
  }
})`
  background-color: white;
  padding: 20px 50px;

  & * {
    margin: 0px;
  }
`;
