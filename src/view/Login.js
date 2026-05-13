import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import styled from 'styled-components';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
  Spinner
} from 'reactstrap';

const LoginContainer = styled(Container)`
  max-width: 400px;
  margin-top: 50px;
  padding: 30px;
  border: 2px solid #8b7355;
  background-color: #2a2a2a;
  border-radius: 8px;
`;

const Title = styled.h2`
  color: #d4af37;
  text-align: center;
  margin-bottom: 30px;
  font-weight: bold;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 10px;
  background-color: #8b7355;
  border-color: #8b7355;

  &:hover {
    background-color: #6b5344;
    border-color: #6b5344;
  }
`;

const OAuthButton = styled(Button)`
  width: 100%;
  margin-top: 10px;
  background-color: #555;
  border-color: #333;

  &:hover {
    background-color: #444;
    border-color: #222;
  }
`;

const ToggleText = styled.p`
  text-align: center;
  color: #aaa;
  margin-top: 20px;
  font-size: 14px;

  a {
    color: #d4af37;
    cursor: pointer;
    text-decoration: underline;

    &:hover {
      color: #fff;
    }
  }
`;

const Login = () => {
  const { currentUser, loading, register, login, error } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState('');

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner color="primary" />
      </Container>
    );
  }

  if (currentUser) {
    return <Redirect to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setIsSubmitting(true);

    try {
      if (isSignUp) {
        if (!email || !username || !password || !confirmPassword) {
          throw new Error('All fields are required');
        }
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        await register(email, username, password);
      } else {
        if (!email || !password) {
          throw new Error('Email and password are required');
        }
        await login(email, password);
      }
    } catch (err) {
      setLocalError(err.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LoginContainer>
      <Title>{isSignUp ? 'Create Account' : 'Sign In'}</Title>

      {(error || localError) && (
        <Alert color="danger">{error || localError}</Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
          />
        </FormGroup>

        {isSignUp && (
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isSubmitting}
            />
          </FormGroup>
        )}

        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isSubmitting}
          />
        </FormGroup>

        {isSignUp && (
          <FormGroup>
            <Label for="confirm-password">Confirm Password</Label>
            <Input
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isSubmitting}
            />
          </FormGroup>
        )}

        <StyledButton type="submit" color="primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Spinner size="sm" /> Loading...
            </>
          ) : (
            isSignUp ? 'Create Account' : 'Sign In'
          )}
        </StyledButton>
      </Form>

      <div style={{ margin: '20px 0', textAlign: 'center', color: '#666' }}>
        <small>Coming soon: Google & GitHub login</small>
      </div>

      <ToggleText>
        {isSignUp ? (
          <>
            Already have an account? <a onClick={() => setIsSignUp(false)}>Sign In</a>
          </>
        ) : (
          <>
            Don't have an account? <a onClick={() => setIsSignUp(true)}>Create Account</a>
          </>
        )}
      </ToggleText>
    </LoginContainer>
  );
};

export default Login;
