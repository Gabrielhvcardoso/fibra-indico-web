import { AnimatePresence } from 'framer-motion';
import React, { useContext, useEffect, useState } from 'react';
import Backdrop from '../../../../../../components/Backdrop';
import { Button, Container, TextInput, Title } from './styles';
import immutable from 'immutability-helper';

import { Product } from '../../../../../../models/Product';

import AuthContext from '../../../../../../context/auth';
import DataContext from '../../../../../../context/data';
import VisualizationContext from '../../context';

import { currencyFormat } from '../../../../../../utils';
import { useFetch } from '../../../../../../hooks';
import Alert from '../../../../../../components/Alert';

const ProductModal: React.FC = () => {
  const { secret } = useContext(AuthContext);
  const { products, setProducts } = useContext(DataContext);
  const { isCreating, selected, setIsCreating, setSelected } = useContext(VisualizationContext);

  const [error, setError] = useState<null | string>(null);
  const [current, setCurrent] = useState<null | Product>(null);

  useEffect(() => {
    if (selected) setCurrent(selected);
    else if (isCreating) setCurrent({} as Product);
    else setCurrent(null);
  }, [isCreating, selected]);

  const onDismiss = () => {
    setSelected(null);
    setIsCreating(false);
  };

  const destroy = () => {
    if (current) {
      useFetch.delete(`/m/p/${current.productId}/${secret}`, (response) => {
        if (response.code === 'error') return setError('Não foi possível excluir esse produto, entre em contato com o desenvolvedor se o problema persistir');

        const index = products.findIndex(item => item.productId === current.productId);

        setProducts(immutable(products, {
          $splice: [[index, 1]]
        }));

        onDismiss();
      });
    }
  };

  const create = () => {
    if (current) {
      useFetch.put(`/m/p/${secret}`, { product: { title: current.title, commission: current.commission } }, (response) => {
        if (response.code === 'error') return setError('Não foi possível criar um novo produto.');

        const { productId } = response;

        setProducts(immutable(products, {
          $push: [{ ...current, productId }]
        }));

        onDismiss();
      });
    }
  };

  const update = () => {
    if (current) {
      useFetch.post(`/m/p/${secret}`, { productId: current.productId, product: { title: current.title, commission: current.commission } }, (response) => {
        if (response.code === 'error') return setError('Não foi possível salvar as alterações.');

        const index = products.findIndex(item => item.productId === current.productId);

        setProducts(immutable(products, {
          [index]: { $set: current }
        }));

        onDismiss();
      });
    }
  };

  return (
    <AnimatePresence>
      {
        current && (
          <Backdrop onMouseDown={onDismiss}>
            <Alert visible={Boolean(error)} onDismiss={() => setError(null)} timeout={4000}>{ error }</Alert>
            <Container /* layoutId={selected.productId.toString()} */ >
              <Title>
                { current.productId ? 'Editar produto' : 'Criar produto' }
              </Title>

              <TextInput
                type="text"
                onChange={(e) => setCurrent({ ...current, title: e.target.value })}
                placeholder="Título do produto"
                value={current.title}
              />
              <TextInput
                mini
                type="text"
                onChange={(e) => {
                  const currencyFormatted = parseFloat(currencyFormat(e.target.value, true).substring(3).replace('.', '').replace(',', '.'));
                  setCurrent({ ...current, commission: currencyFormatted });
                }}
                onKeyDown={e => e.code === 'Enter' ? current.productId ? update() : create() : null}
                placeholder="Valor da comissão"
                value={currencyFormat(current.commission, true)}
              />
              {
                current.productId
                  ? (
                      <div style={{ display: 'flex' }}>
                        <Button onClick={() => destroy()} style={{ flex: 1, marginRight: 5 }}>Excluir</Button>
                        <Button onClick={update} style={{ flex: 1, marginLeft: 5 }}
                        >Salvar alterações</Button>
                      </div>
                    )
                  : <Button onClick={create}>Salvar produto</Button>
              }
            </Container>
          </Backdrop>
        )
      }
    </AnimatePresence>
  );
};

export default ProductModal;
