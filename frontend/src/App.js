import React from 'react';
import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ChatPage from './Pages/ChatPage';
import Homepage from './Pages/Homepage';
import LoginSignup from './Pages/Login-Signup';

// const httpLink = createHttpLink({
//   uri: '/graphql',
// });

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem('id_token');
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

function App() {

  return (
    <div className="App">
      {/* <ApolloProvider client={client}> */}
      <Router>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/Login' component={LoginSignup} />
        <Route exact path='/chats' component={ChatPage} />
      </Router>
      {/* </ApolloProvider> */}
    </div>
  );
}

export default App;