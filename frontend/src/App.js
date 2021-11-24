import React from 'react'
import { Button } from '@chakra-ui/button';
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import Register from './components/Register'
import Home from './components/Home'
import Login from './components/Login'

import './App.css'

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      <Container className="pt-5">
        <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        </Switch>
      </Container>
      </Router>
    </ApolloProvider>
  )
}

export default App;
