import React, { createRef, useContext, useEffect, useState } from 'react';
import Tree from 'react-tree-graph';
import { Container, IndicatedTag } from './styles';
import Options from './components/Options';

import { User } from '../../../../models/User';

import AuthContext from '../../../../context/auth';
import DataContext from '../../../../context/data';
import UsersContext from '../../context';

import { useDimensions, useFetch } from '../../../../hooks';

import 'react-tree-graph/dist/style.css';
import './treeStyles.css';

export type UserTree = User & { children?: UserTree };

const Visualization: React.FC = () => {
  const { secret } = useContext(AuthContext);
  const { users } = useContext(DataContext);
  const { token, setToken, indicatedBy, setIndicatedBy } = useContext(UsersContext);

  const [tree, setTree] = useState<UserTree | {}>({});

  const containerRef = createRef<HTMLDivElement>();
  const { height, width } = useDimensions(containerRef);

  useEffect(() => {
    findTree();
  }, [token, secret]);

  const findTree = () => {
    if (token && secret) {
      useFetch.get(`/m/u/r/${token}/${secret}`, (response: Array<UserTree>) => {
        console.log(response);
        setTree(response[0] ?? []);
      });
    } else setTree({});
  };

  const seeIndicatedBy = (utoken: string) => {
    const user = users.find(({ token: userToken }) => utoken === userToken);

    if (user) {
      setToken(user.token);
      setIndicatedBy(user.indicatedBy ?? null);
    }
  };

  return (
    <Container ref={containerRef} >
      <Options findTree={findTree} />
      { indicatedBy && <IndicatedTag onClick={() => seeIndicatedBy(indicatedBy)}>Indicado por: { indicatedBy.toUpperCase() }</IndicatedTag> }
        <Tree
          data={tree}
          nodeRadius={15}
          margins={{ top: 20, bottom: 10, left: 20, right: 200 }}
          height={height}
          width={width}
        />
      )
    </Container>
  );
};

export default Visualization;
