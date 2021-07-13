import Vue from 'vue';
import App from './App.vue';
import VueApollo from 'vue-apollo';
import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:3000/graphql',
});

Vue.use(VueApollo);
// Cache implementation
const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: 'RecarSuperSecret',
    }
  }
});

// Create the apollo client
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});


const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});


new Vue({
  el: '#app',
  apolloProvider,
  render: h => h(App),
}).$mount('#app');
