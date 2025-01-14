import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useFetch } from '../../../hooks';
import { Container, Modal, WithdrawItem } from './styles';
import update from 'immutability-helper';

import { Withdraw } from '../../../models/Withdraw';
import { User } from '../../../models/User';

import AuthContext from '../../../context/auth';
import Backdrop from '../../../components/Backdrop';
import { AnimatePresence } from 'framer-motion';
import { format, setHours, setMinutes, setSeconds, setMilliseconds, subDays, subWeeks, subMonths, subYears } from 'date-fns';
import { currencyFormat } from '../../../utils';
import { Account } from '../../../models/Account';
import { Button, TopButton, FloatingContainer, Select } from '../Recommendations/styles';
import Alert from '../../../components/Alert';

type WithdrawOrder = Omit<Withdraw, 'fromUserToken'> & { user: User };

const Withdraws: React.FC = () => {
  const { secret } = useContext(AuthContext);

  const [withdraws, setWithdraws] = useState<Array<WithdrawOrder>>([]);
  const [error, setError] = useState<null | string>(null);

  const [selected, setSelected] = useState<WithdrawOrder | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<null | Account>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  const [dateLimits, setDateLimits] = useState<null | { start: number, end: number }>(null);

  const setFilter = (filter: number) => {
    /*
      DATE FILTER
      0 - ALL
      1 - HOJE
      2 - ESSA SEMANA
      3 - ESSE MÊS
      4 - TRÊS MESES
      5 - SEIS MESES
      6 - ESSE ANO
      7 - ANO PASSADO
    */

    const today = setHours(setMinutes(setSeconds(setMilliseconds(new Date().getTime(), 0), 0), 0), 0).getTime();
    let start: null | number, end: null | number;

    switch (filter) {
      case 1:
        start = today;
        end = subDays(today, 1).getTime();
        break;

      case 2:
        start = today;
        end = subWeeks(today, 1).getTime();
        break;

      case 3:
        start = today;
        end = subMonths(today, 1).getTime();
        break;

      case 4:
        start = today;
        end = subMonths(today, 3).getTime();
        break;

      case 5:
        start = today;
        end = subMonths(today, 6).getTime();
        break;

      case 6:
        start = today;
        end = subYears(today, 1).getTime();
        break;

      case 7:
        start = subYears(today, 1).getTime();
        end = subYears(today, 2).getTime();
        break;

      default:
        start = null;
        end = null;
        break;
    }

    console.log(start + ' - ' + end);
    if (start && end) setDateLimits({ start, end });
    else setDateLimits(null);
  };

  useEffect(() => {
    useFetch.get(`/m/w/${secret}`, (response) => {
      setWithdraws(response.withdrawOrders);
    });
  }, []);

  useEffect(() => {
    if (selected) {
      const { secret, token } = selected.user;
      useFetch.get(`/u/a/${token}/${secret}`, (response: Account) => {
        console.log(response);
        setSelectedAccount(response);
      });
    }
    setSelectedAccount(null);
  }, [selected]);

  const setWithdrawStatus = (withdrawOrderId: number, status: string) => {
    useFetch.post(`/m/w/${secret}`, { withdrawOrderId, status }, (response) => {
      if (response.code === 'error') {
        return setError('Não foi possível alterar o status do pedido de saque');
      }

      const index = withdraws.findIndex(({ withdrawOrderId: currentId }) => withdrawOrderId === currentId);
      setWithdraws(update(withdraws, {
        [index]: { $set: { ...withdraws[index], status } }
      }));
      setSelected(null);
    });
  };

  const displayedWithdraws = useMemo(() => {
    const returning = showAll ? withdraws : withdraws.filter(({ status }) => status === 'pending');
    if (dateLimits) {
      const { start, end } = dateLimits;
      return returning.filter(({ createdAt }) => parseInt(createdAt) < start && parseInt(createdAt) > end);
    } else {
      return returning;
    }
  }, [showAll, withdraws, dateLimits]);

  return (
    <Container>
      <FloatingContainer>
        <TopButton
          onClick={() => setShowAll(!showAll)}
        >
          { showAll ? 'Filtrar pendentes' : 'Mostrar todos' }
        </TopButton>

        <Select onChange={e => setFilter(parseInt(e.target.value))}>
          <option value={0}>Tudo</option>
          <option value={1}>Hoje</option>
          <option value={2}>Últimos 7 dias</option>
          <option value={3}>Últimos 30 dias</option>
          <option value={4}>Últimos 3 meses</option>
          <option value={5}>Últimos 6 meses</option>
          <option value={6}>Último ano</option>
          <option value={7}>Ano passado</option>
        </Select>
      </FloatingContainer>
      {
       displayedWithdraws.map((item) => (
          <WithdrawItem
            item={item}
            key={item.withdrawOrderId}
            onClick={() => setSelected(item)}
          />
       ))
      }
      <AnimatePresence>
        {
          selected && (
            <Backdrop onMouseDown={() => setSelected(null)}>
              <Alert visible={Boolean(error)} onDismiss={() => setError(null)} timeout={4000}>
                { error }
              </Alert>
              <Modal>
                <p>Detalhes sobre a pedido de { selected.user.name }</p>
                <p>{ currencyFormat(selected.amount, true) } - { format(parseInt(selected.createdAt), 'dd/MM/yyyy - kk:mm') }</p>

                <br />

                <div style={{ backgroundColor: '#eee', padding: 10, display: 'flex', flexDirection: 'column' }}>
                  <p>{ selected.user.name } ({ selected.user.status === 1 ? 'Ativo' : 'Inativo' })</p>
                  <small>{ selected.user.city } - { selected.user.state }</small><br />
                  <small>{ selected.user.email }</small>
                  <small>{ selected.user.phone }</small>
                </div>

                <div style={{ marginTop: 20, backgroundColor: '#eee', padding: 10, display: 'flex', flexDirection: 'column' }}>
                  {
                    selectedAccount === null
                      ? <p>Carregando...</p>
                      : (
                          <>
                            {
                              JSON.parse(selectedAccount.accountJson).pix
                                ? <p>Chave PIX: { JSON.parse(selectedAccount.accountJson).pix }</p>
                                : JSON.parse(selectedAccount.accountJson).picpay
                                  ? <p>PicPay: { JSON.parse(selectedAccount.accountJson).picpay }</p>
                                  : JSON.parse(selectedAccount.accountJson).bank && (
                                    <>
                                      <p>Titular: { JSON.parse(selectedAccount.accountJson)?.name }</p>
                                      <p>CPF: { JSON.parse(selectedAccount.accountJson)?.cpf }</p>
                                      <p>Código do Banco: { JSON.parse(selectedAccount.accountJson)?.bank }</p>
                                      <p>Agência: { JSON.parse(selectedAccount.accountJson)?.agency }</p>
                                      <p>Conta: { JSON.parse(selectedAccount.accountJson)?.account }</p>
                                    </>
                                  )
                            }
                          </>
                        )
                  }
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
                  <Button onClick={() => setWithdrawStatus(selected.withdrawOrderId, 'recused')} style={{ marginRight: 10 }}>Recusar</Button>
                  <Button onClick={() => setWithdrawStatus(selected.withdrawOrderId, 'failed')} style={{ marginRight: 10 }}>Com problemas</Button>
                  <Button onClick={() => setWithdrawStatus(selected.withdrawOrderId, 'done')}>Confirmar pagamento</Button>
                </div>
              </Modal>
            </Backdrop>
          )
        }
      </AnimatePresence>
    </Container>
  );
};

export default Withdraws;
