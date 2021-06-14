import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { getToken } from './helpers/storage';

type Props = RouteProps & {
  layout: React.ElementType;
  component: React.ElementType;
};

const PrivateRoute: React.FC<Props> = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      getToken() ? (
        <Layout>
          <Component {...props} />
        </Layout>
      ) : (
        <Redirect
          to={{
            pathname: '/sign-in',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
