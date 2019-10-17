import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
//import { gql } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import SongList from './components/SongList';
import SongCreate from './components/SongCreate';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});
const App = () => {
  // client
  //   .query({
  //     query: gql`
  //       {
  //         songs {
  //           id
  //           title
  //         }
  //       }
  //     `
  //   })
  //   .then(result => console.log(result));

  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/">
            <SongList />
          </Route>
          <Route path="/songs/new">
            <SongCreate />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
