import React, { useContext, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Backdrop from '../../../../../../components/Backdrop';
import { ConffirmButton, Container, Heading, Helper, PorcentageTextInput } from './styles';

import { ArrowRight } from 'react-bootstrap-icons';

import HierarchyListContext from '../../context';
import { Hierarchy } from '../../../../../../models/Hierarchy';

const HierarchyModal: React.FC = () => {
  const { selected, isCreating, setSelected, setIsCreating } = useContext(HierarchyListContext);
  const [current, setCurrent] = useState<Hierarchy | null>(null);

  useEffect(() => {
    if (selected) setCurrent(selected);
    else if (isCreating) setCurrent({} as Hierarchy);
    else setCurrent(null);
  }, [selected, isCreating]);

  const onDismiss = () => {
    setCurrent(null);
    if (selected) setSelected(null);
    if (isCreating) setIsCreating(false);
  };

  return (
    <AnimatePresence>
      {
        current && (
          <Backdrop onMouseDown={onDismiss}>
            <Container layoutId={current.hierarchyId?.toString()}>
              {
                current.depth
                  ? <Heading>Mudar porcentagem para o nível <b>{ current.depth }</b></Heading>
                  : <Heading>Qual a porcentagem para o <b>novo nível</b>?</Heading>
              }
              <PorcentageTextInput
                placeholder="Apenas números"
                error={current.porcentage < 0 || current.porcentage > 100}
                value={current.porcentage ?? ''}
                onChange={e => setCurrent({ ...current, porcentage: parseFloat(e.target.value) })}
              />
              <div style={{ height: 14 }}>
                <AnimatePresence>
                  {
                    (current.porcentage < 0 || current.porcentage > 100) &&
                      <Helper>Número deve estar entre 0% e 100%</Helper>
                  }
                </AnimatePresence>
              </div>

              <div style={{ height: 0, display: 'flex', justifyContent: 'flex-end' }}>
                <AnimatePresence>
                  {
                    (current.porcentage && !(current.porcentage < 0 || current.porcentage > 100)) && (
                      <ConffirmButton>
                        <ArrowRight size={24} color={'black'} />
                      </ConffirmButton>
                    )
                  }
                </AnimatePresence>
              </div>

            </Container>
          </Backdrop>
        )
      }
    </AnimatePresence>
  );
};

export default HierarchyModal;
