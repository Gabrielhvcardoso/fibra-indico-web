/* eslint-disable camelcase */
import { AnimatePresence } from 'framer-motion';
import React, { useContext, useState } from 'react';
import Alert from '../components/Alert';
import { ArrowRight } from 'react-bootstrap-icons';
import { useFetch } from '../hooks';
import { Button, Container, TextInput } from './styles';

import AuthContext from '../context/auth';

const auth: React.FC = () => {
  const { authenticate } = useContext(AuthContext);

  const [error, setError] = useState<boolean>(false);
  const [persistence, setPersistence] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSave = () => {
    useFetch.post('/m', { email, password }, (response) => {
      if (response.code === 'error') return setError(true);
      const { admin_secret } = response;
      authenticate(admin_secret, persistence);
    });
  };

  return (
    <Container>
      <Alert visible={error} onDismiss={() => setError(false)} timeout={4000}>
        Não foi possível entrar com essas credenciais
      </Alert>

      <TextInput
        onChange={e => setEmail(e.target.value)}
        placeholder="E-mail"
        type="email"
        value={email}
      />
      <TextInput
        onChange={e => setPassword(e.target.value)}
        placeholder="Senha"
        type="password"
        value={password}
      />

      <div style={{ height: 30 }}>
        <input
          id="persistence"
          onChange={e => setPersistence(e.target.checked)}
          type="checkbox"
          checked={persistence}
        />
        <label htmlFor="persistence">Manter conectado</label>
      </div>

      <AnimatePresence>
        {
          (email && password) && (
            <Button onClick={handleSave}>
              <ArrowRight size={20} />
            </Button>
          )
        }
      </AnimatePresence>
    </Container>
  );
};

export default auth;
