import React from 'react';
import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ChatPage from './Pages/ChatPage';
import Homepage from './Pages/Homepage';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {

  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <Route exact path='/' component={ChatPage}/>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;