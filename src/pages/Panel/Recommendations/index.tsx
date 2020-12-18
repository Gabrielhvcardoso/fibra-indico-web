import React, { useContext, useEffect, useState } from 'react';
import { Container } from './styles';

import { Recommendation } from '../../../models/Recommendation';

// import Item from './components/Item';
import { useFetch } from '../../../hooks';

import AuthContext from '../../../context/auth';
import Item from './components/Item';

const Recommendations: React.FC = () => {
  const { secret } = useContext(AuthContext);

  const [recommendations, setRecommendations] = useState<null | Array<Recommendation>>(null);

  useEffect(() => {
    useFetch.get(`/m/r/${secret}`, (response) => setRecommendations(response));
  }, []);

  if (!recommendations) return <></>;

  return (
    <Container>
      <h2 style={{ marginLeft: 20 }}>Recomendações</h2>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </Container>
  );
};

export default Recommendations;
