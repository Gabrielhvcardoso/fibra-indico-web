import { AnimatePresence } from 'framer-motion';
import React, { useContext, useEffect, useState } from 'react';
import Backdrop from '../../../../../../components/Backdrop';
import { Button, Container, TextInput, Title } from './styles';

import { Product } from '../../../../../../models/Product';

import VisualizationContext from '../../context';

import { currencyFormat } from '../../../../../../utils';

const ProductModal: React.FC = () => {
  const { isCreating, selected, setIsCreating, setSelected } = useContext(VisualizationContext);
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

  return (
    <AnimatePresence>
      {
        current && (
          <Backdrop onMouseDown={onDismiss}>
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
                placeholder="Valor da comissão"
                value={currencyFormat(current.commission, true)}
              />
              <Button>{ current.productId ? 'Salvar alterações' : 'Salvar produto' }</Button>
            </Container>
          </Backdrop>
        )
      }
    </AnimatePresence>
  );
};

export default ProductModal;
