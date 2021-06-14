import { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ConfigProvider } from 'antd';

import '../scss/App.scss';

import { validateMessages } from './config/validate';

import PrivateRoute from './PrivateRoute';
import MainLayout from './components/layout/MainLayout';

const Home = lazy(() => import('./pages/home'));

const SignIn = lazy(() => import('./pages/auth/SignIn'));
const SignUp = lazy(() => import('./pages/auth/SignUp'));

const Task = lazy(() => import('./pages/task'));

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
      <Suspense fallback={null}>
        <Switch>
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />

          <PrivateRoute exact path="/" component={Home} layout={MainLayout} />
          <PrivateRoute exact path="/tasks" component={Task} layout={MainLayout} />
        </Switch>
      </Suspense>
    </div>
  </BrowserRouter>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider form={{ validateMessages }}>
        {ROUTE}

        <ReactQueryDevtools />
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default App;
