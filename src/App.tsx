import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import './scss/App.scss';

import PrivateRoute from './PrivateRoute';
import MainLayout from './components/lyaout/MainLayout';

import Home from './pages/Home';
import SignIn from './pages/SignIn';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

const ROUTE = (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/sign-in" component={SignIn} />
        <PrivateRoute exact path="/" component={Home} layout={MainLayout} />
      </Switch>
    </div>
  </BrowserRouter>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {ROUTE}

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
