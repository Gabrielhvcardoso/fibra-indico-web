import React, { createRef, useContext, useEffect, useState } from 'react';
import Tree from 'react-tree-graph';
import { Container } from './styles';
import Options from './components/Options';

import { User } from '../../../../models/User';

import AuthContext from '../../../../context/auth';
import UsersContext from '../../context';

import { useDimensions, useFetch } from '../../../../hooks';

import 'react-tree-graph/dist/style.css';
import './treeStyles.css';

export type UserTree = User & { children?: UserTree };

const Visualization: React.FC = () => {
  const { secret } = useContext(AuthContext);
  const { token } = useContext(UsersContext);

  const [tree, setTree] = useState<null | Array<UserTree>>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const containerRef = createRef<HTMLDivElement>();
  const { height, width } = useDimensions(containerRef);

  useEffect(() => {
    if (token && secret) {
      setIsLoading(true);
      useFetch.get(`/m/u/r/${token}/${secret}`, (response: Array<UserTree>) => {
        setTree(response);
        setIsLoading(false);
      });
    } else setTree(null);
  }, [token, secret]);

  if (!tree) return <></>;

  return (
    <Container ref={containerRef} >
      <Options />
      {
        !isLoading && (
          <Tree
            data={tree[0]}
            nodeRadius={15}
            margins={{ top: 20, bottom: 10, left: 20, right: 200 }}
            height={height}
            width={width}
          />
        )
      }
    </Container>
  );
};

export default Visualization;
