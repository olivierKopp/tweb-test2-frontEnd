import React from 'react';
import {Route, Redirect } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

export const ProtectedRoute = ({ component: Component, ...others }) => (
    <Route {...others} render={(params) => (
        <AuthContext>
            {({ user }) => user
                ? <Component {...params} />
                : <Redirect to="/login" />}
        </AuthContext>
    )} 
    />
);