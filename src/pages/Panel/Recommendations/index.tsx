import React, { useContext, useEffect, useState } from 'react';
import Backdrop from '../../../components/Backdrop';
import { AnimatePresence } from 'framer-motion';
import { Button, Column, Container, FloatingButton, ListItem, Modal } from './styles';
import update from 'immutability-helper';

import { Product } from '../../../models/Product';
import { Recommendation } from '../../../models/Recommendation';
import { User } from '../../../models/User';

import AuthContext from '../../../context/auth';

import { currencyFormat } from '../../../utils';
import { useFetch } from '../../../hooks';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Alert from '../../../components/Alert';

type RecommendationWithUser = Omit<Omit<Recommendation, 'fromUserToken'>, 'productId'> & { user: User, product: Product };

const Recommendations: React.FC = () => {
  const { secret } = useContext(AuthContext);

  const [selected, setSelected] = useState<null | RecommendationWithUser>(null);
  const [error, setError] = useState<null | string>(null);
  const [recommendations, setRecommendations] = useState<Array<RecommendationWithUser>>([]);

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

  return (
    <Container>
      <FloatingButton onClick={() => setShowAll(!showAll)}>
        { showAll ? 'Filtrar pendentes' : 'Mostrar todos' }
      </FloatingButton>
      {
        recommendations.filter(({ status }) => showAll ? true : status === 'pendent').map(item => {
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
