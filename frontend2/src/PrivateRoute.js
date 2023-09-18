import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoute({ element, isLoggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      element={isLoggedIn ? element : <Navigate to="/login" />}
    />
  );
}

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default PrivateRoute;



