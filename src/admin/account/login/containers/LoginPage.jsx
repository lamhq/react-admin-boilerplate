import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import LoginPage from '../components/LoginPage';

function validateLoginForm(data) {
  const constraints = {
    email: {
      presence: { allowEmpty: false },
    },
    password: {
      presence: { allowEmpty: false },
    },
  };

  return transformErrors(validate(data, constraints));
}

export default function LoginPageContainer() {
  const { login } = useApi();
  const history = useHistory();
  const location = useLocation();

  function goBackPrevPage() {
    const { from } = location.state || { from: { pathname: '/' } };
    history.push(from);
  }

  async function handleSubmit(values, { setSubmitting, setErrors }) {
    try {
      const { email, password } = values;
      const identity = await login(email, password);
      setIdentity(identity);
      goBackPrevPage();
    } catch (error) {
      if (error.code === 'invalid-user-input') {
        setErrors(error.detail);
      } else {
        alertError('Login error', error.title);
      }
    }
    setSubmitting(false);
  }

  return (
    <LoginPage
      validateForm={validateLoginForm}
      onSubmit={handleSubmit}
    />
  );
}
