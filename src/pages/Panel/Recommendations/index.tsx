import React, { useContext, useEffect, useMemo, useState } from 'react';
import Backdrop from '../../../components/Backdrop';
import { AnimatePresence } from 'framer-motion';
import { Button, Column, Container, TopButton, FloatingContainer, ListItem, Modal, Select } from './styles';
import update from 'immutability-helper';

import { Product } from '../../../models/Product';
import { Recommendation } from '../../../models/Recommendation';
import { User } from '../../../models/User';

import AuthContext from '../../../context/auth';

import { currencyFormat } from '../../../utils';
import { useFetch } from '../../../hooks';
import { formatDistanceToNow, setHours, setMinutes, setSeconds, setMilliseconds, subDays, subWeeks, subMonths, subYears } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Alert from '../../../components/Alert';

import './arrow.css';

type RecommendationWithUser = Omit<Omit<Recommendation, 'fromUserToken'>, 'productId'> & { user: User, product: Product };

const Recommendations: React.FC = () => {
  const { secret } = useContext(AuthContext);

  const [selected, setSelected] = useState<null | RecommendationWithUser>(null);
  const [error, setError] = useState<null | string>(null);
  const [recommendations, setRecommendations] = useState<Array<RecommendationWithUser>>([]);

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

  const [showAll, setShowAll] = useState<boolean>(false);

  useEffect(() => {
    useFetch.get(`/m/r/${secret}`, (response) => {
      if (response.code === 'success') setRecommendations(response.recommendations);
      console.log(response);
    });
  }, []);

  const resolveStatus = (status: string) => {
    switch (status) {
      case 'no-response': return 'Sem resposta';
      case 'pendent': return 'Pendente';
      case 'cancelled': return 'Cancelado';
      case 'done': return 'Finalizado';
      default: return 'Indefinido';
    }
  };

  const setRecommendationStatus = (status: string) => {
    if (selected) {
      const { recommendationId } = selected;
      useFetch.post(`/m/r/${secret}`, { recommendationId, status }, (response) => {
        if (response.code === 'error') {
          return setError('Não foi possível atualizar o status dessa recomendação.');
        }

        const index = recommendations.findIndex(({ recommendationId: currentId }) => currentId === recommendationId);
        setRecommendations(update(recommendations, {
          [index]: { $set: { ...recommendations[index], status } }
        }));
        setSelected(null);
      });
    }
  };

  const displayRecommendations = useMemo(() => {
    if (dateLimits) {
      const { start, end } = dateLimits;
      return recommendations.filter(({ createdAt }) => parseInt(createdAt) < start && parseInt(createdAt) > end);
    } else {
      return recommendations;
    }
  }, [recommendations, dateLimits]);

  return (
    <Container>
      <FloatingContainer>
        <TopButton
          onClick={() => setShowAll(!showAll)}>
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
        displayRecommendations.filter(({ status }) => showAll ? true : status === 'pendent').map(item => {
          const { recommendationId, client, status, createdAt, user, product } = item;

          return (
            <ListItem
              key={recommendationId}
              onClick={() => setSelected(item)}
            >
              <Column>
                <span>{ product.title } ({ client })</span>
                <small>Indicado por <i style={{ color: 'blue' }}>{ user.name }</i></small>
                <small>{ resolveStatus(status) } - há { formatDistanceToNow(parseInt(createdAt), { locale: ptBR }) }</small>
              </Column>
            </ListItem>
          );
        })
      }
      <AnimatePresence>
        {
          selected && (
            <Backdrop onMouseDown={() => setSelected(null)}>
              <Alert visible={Boolean(error)} onDismiss={() => setError(null)} timeout={4000}>
                { error }
              </Alert>
              <Modal>
                <p>Detalhes sobre a recomendação de { selected.user.name }</p>
                <p>
                  <b>
                    { selected.product.title }
                    <br />
                    Comissão: { currencyFormat(selected.product.commission, true) }
                  </b>
                </p>

                <div style={{ backgroundColor: '#eee', padding: 10 }}>
                  <small>CLIENTE</small><br/><hr />
                  <span>{ selected.client }</span><br />
                  <span>{ selected.phone1 }</span><br />
                  { selected.phone2 && <span>{ selected.phone2 }</span> }
                </div>

                <div style={{ backgroundColor: '#eee', marginTop: 20, padding: 10 }}>
                  <small>INDICADO POR</small><br/><hr />
                  <span>{ selected.user.name }</span><br />
                  <span>{ selected.user.city } - { selected.user.state }</span><br /><br />
                  <span>{ selected.user.email }</span><br />
                  <span>{ selected.user.phone }</span><br />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
                  <Button onClick={() => setRecommendationStatus('no-response')}>Sem resposta</Button>
                  <Button onClick={() => setRecommendationStatus('cancelled')}>Cancelado</Button>
                  <Button onClick={() => setRecommendationStatus('done')}>Instalado</Button>
                </div>
              </Modal>
            </Backdrop>
          )
        }
      </AnimatePresence>
    </Container>
  );
};

export default Recommendations;
