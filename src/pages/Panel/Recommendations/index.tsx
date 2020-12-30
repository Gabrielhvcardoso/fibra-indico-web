import React, { useContext, useEffect, useState } from 'react';
import Backdrop from '../../../components/Backdrop';
import { AnimatePresence } from 'framer-motion';
import { Button, Column, Container, ListItem, Modal } from './styles';

import { Product } from '../../../models/Product';
import { Recommendation } from '../../../models/Recommendation';
import { User } from '../../../models/User';

import AuthContext from '../../../context/auth';

import { currencyFormat } from '../../../utils';
import { useFetch } from '../../../hooks';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type RecommendationWithUser = Omit<Omit<Recommendation, 'fromUserToken'>, 'productId'> & { user: User, product: Product };

const Recommendations: React.FC = () => {
  const { secret } = useContext(AuthContext);

  const [selected, setSelected] = useState<null | RecommendationWithUser>(null);
  const [recommendations, setRecommendations] = useState<Array<RecommendationWithUser>>([]);

  useEffect(() => {
    useFetch.get(`/m/r/${secret}`, (response) => {
      if (response.code === 'success') setRecommendations(response.recommendations);
      console.log(response);
    });
  }, []);

  return (
    <Container>
      {
        recommendations.map(item => {
          const { recommendationId, client, status, createdAt, user, product } = item;

          return (
            <ListItem
              key={recommendationId}
              onClick={() => setSelected(item)}
            >
              <Column>
                <span>{ product.title } ({ client })</span>
                <small>Indicado por <i style={{ color: 'blue' }}>{ user.name }</i></small>
                <small>{ status } - há { formatDistanceToNow(parseInt(createdAt), { locale: ptBR }) }</small>
              </Column>
            </ListItem>
          );
        })
      }
      <AnimatePresence>
        {
          selected && (
            <Backdrop onMouseDown={() => setSelected(null)}>
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
                  <Button>Sem resposta</Button>
                  <Button>Cancelado</Button>
                  <Button>Instalado</Button>
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
