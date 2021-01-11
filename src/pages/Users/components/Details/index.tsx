/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useMemo, useState } from 'react';
import Alert from '../../../../components/Alert';
import Backdrop from '../../../../components/Backdrop';
import Loader from 'react-loader-spinner';
import { Portal } from 'react-portal';
import { Container, LabelLine, StatsBox, StatsItem } from './styles';
import { AnimatePresence } from 'framer-motion';

import UsersContext from '../../context';
import { useFetch } from '../../../../hooks';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { Recommendation } from '../../../../models/Recommendation';
import { User } from '../../../../models/User';
import { Withdraw, isWithdraw } from '../../../../models/Withdraw';
import { format } from 'date-fns/esm';
import { ptBR } from 'date-fns/locale';
import { currencyFormat } from '../../../../utils';

type History = Array<Recommendation | Withdraw>;

const resolveStatus = (status: string, isWithdraw = false) => {
  if (!isWithdraw) {
    switch (status) {
      case 'no-response': return 'Sem resposta';
      case 'pendent': return 'Pendente';
      case 'cancelled': return 'Cancelado';
      case 'done': return 'Finalizado';
      default: return 'Indefinido';
    }
  } else {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'recused': return 'Recusado';
      case 'failed': return 'Com problemas';
      case 'done': return 'Finalizado';
      default: return 'Indefinido';
    }
  }
};

const Profile: React.FC<{ user: User }> = ({ user }) => {
  const { account, name, email, status, token, phone, city, state, cpf, secret } = user;
  const [history, setHistory] = useState<History>([]);

  const recommendations = useMemo<Array<Recommendation>>(() => (history.filter(item => !isWithdraw(item)) as Array<Recommendation>), [history]);
  const withdraws = useMemo<Array<Withdraw>>(() => (history.filter(item => isWithdraw(item)) as Array<Withdraw>), [history]);

  useEffect(() => {
    useFetch.get(`/u/${token}/${secret}`, (response) => {
      if (response.code === 'success') {
        setHistory(response.history);
      }
    });
  }, []);

  return (
    <Container>
      <p>{ name } ({ token.toUpperCase() })</p>
      <small>{ city + ' - ' + state }</small>
      <a href={`mailto:${email}`}><small>{ email }</small></a>
      <a href={`https://wa.me/55${phone.replace(/[^\d]+/g, '')}`}><small>{ phone }</small></a>
      <small>{ cpf }</small>
      <small>status: { status ? 'Ativo' : 'Inativo' }</small>

      <br />

      <small>Saldo: { currencyFormat(account, true) }</small>

      {
        recommendations[0] && (
          <StatsBox>
            <LabelLine>Recomendações ({ recommendations.length })</LabelLine>
            <hr />
            {
              recommendations.map((item) => (
                <StatsItem key={item.recommendationId}>
                  <span>{ format(parseInt(item.createdAt), "dd 'de' MMMM 'de' yyyy 'às' kk:mm", { locale: ptBR }) }</span>
                  <span>{ resolveStatus(item.status) }</span>
                </StatsItem>
              ))
            }
          </StatsBox>
        )
      }

      {
        withdraws[0] && (
          <StatsBox>
            <LabelLine>Saques ({ withdraws.length })</LabelLine>
            <hr />
            {
              withdraws.map((item) => (
                <StatsItem key={item.withdrawOrderId}>
                  <span>{ currencyFormat(item.amount, true) } - { format(parseInt(item.createdAt), "dd 'de' MMMM 'de' yyyy 'às' kk:mm", { locale: ptBR }) }</span>
                  <span>{ resolveStatus(item.status, true) }</span>
                </StatsItem>
              ))
            }
          </StatsBox>
        )
      }
    </Container>
  );
};

const Details: React.FC = () => {
  const { isDetailOpened, setIsDetailOpened, token } = useContext(UsersContext);

  const [current, setCurrent] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isDetailOpened) {
      useFetch.get(`/u/${token}`, (response) => {
        if (response.code === 'success') {
          setCurrent(response.user);
        } else {
          setError('Algum erro inesperado aconteceu, procure atualizar a página.');
        }
      });
    } else {
      setCurrent(null);
    }
  }, [isDetailOpened, token]);

  if (!isDetailOpened) return <></>;

  return (
    <Portal>
      <Alert
        visible={Boolean(error)}
        onDismiss={() => setError(null)}
        timeout={4000}
      />
      <AnimatePresence>
        <Backdrop onMouseDown={() => setIsDetailOpened(false)}>
          {
            !current
              ? <Loader
                  type="Triangle"
                  color="#00BFFF"
                  height={100}
                  width={100}
              />
              : <Profile user={current} />
          }
        </Backdrop>
      </AnimatePresence>
    </Portal>
  );
};

export default Details;
