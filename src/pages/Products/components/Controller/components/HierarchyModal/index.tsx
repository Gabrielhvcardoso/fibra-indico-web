import { AnimatePresence } from 'framer-motion';
import immutable from 'immutability-helper';
import React, { useContext, useEffect, useState } from 'react';
import { ArrowRight } from 'react-bootstrap-icons';

import Backdrop from '../../../../../../components/Backdrop';
import { ConffirmButton, Container, Heading, Helper, Link, PorcentageTextInput } from './styles';
import { Hierarchy } from '../../../../../../models/Hierarchy';

import AuthContext from '../../../../../../context/auth';
import DataContext from '../../../../../../context/data';
import HierarchyListContext from '../../context';

import { useFetch } from '../../../../../../hooks';
import Alert from '../../../../../../components/Alert';

const HierarchyModal: React.FC = () => {
  const { secret } = useContext(AuthContext);
  const { setHierarchies, hierarchies } = useContext(DataContext);

  const [error, setError] = useState<string | null>(null);
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

  const create = (): void => {
    const depth = Math.max.apply(Math, hierarchies.map(({ depth }) => depth)) + 1 | 1;

    if (current) {
      useFetch.put(`/m/h/${secret}`, { hierarchy: { depth, porcentage: current.porcentage } }, (response) => {
        if (response.code === 'error') return setError('Não foi possível criar um novo nível na hierarquia');

        const { hierarchyId } = response;

        setHierarchies(immutable(hierarchies, {
          $push: [{ hierarchyId, depth, porcentage: current.porcentage }]
        }));

        onDismiss();
      });
    }
  };

  const update = (): void => {
    if (current) {
      const { hierarchyId, ...rest } = current;
      useFetch.post(`/m/h/${secret}`, { hierarchyId, hierarchy: rest }, (response) => {
        if (response.code === 'error') return setError('Não foi possível atualizar este nível');

        const index = hierarchies.findIndex(item => item.hierarchyId === hierarchyId);
        setHierarchies(immutable(hierarchies, {
          [index]: { $set: current }
        }));

        onDismiss();
      });
    }
  };

  const destroy = () => {
    if (current && current.hierarchyId) {
      useFetch.delete(`/m/h/${current.hierarchyId}/${secret}`, (response) => {
        if (response.code === 'error') return setError('Não foi possível remover este nível');

        const index = hierarchies.findIndex(item => item.hierarchyId === current.hierarchyId);
        setHierarchies(immutable(hierarchies, {
          $splice: [[index, 1]]
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
            <Container /* layoutId={current.hierarchyId?.toString()} */>
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
                onKeyDown={e => e.code === 'Enter' ? current.hierarchyId ? update() : create() : null}
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
                    (!(current.porcentage === selected?.porcentage) && current.porcentage && !(current.porcentage < 0 || current.porcentage > 100)) && (
                      <ConffirmButton onClick={() => current.hierarchyId ? update() : create()}>
                        <ArrowRight size={24} color={'black'} />
                      </ConffirmButton>
                    )
                  }
                </AnimatePresence>
              </div>
              { current.depth && <Link onClick={destroy}>Excluir produto</Link> }
            </Container>
          </Backdrop>
        )
      }
    </AnimatePresence>
  );
};

export default HierarchyModal;
