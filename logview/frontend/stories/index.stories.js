import React from 'react';
import { storiesOf } from '@storybook/react';
import App from '../src/containers/App/App';
import Registration from '../src/containers/Registration/Registration';
import Login from '../src/containers/Login/Login';

storiesOf('App', module).add('App', () => <App msg="Hello World" />);
storiesOf('Registration', module).add('Registration', () => <Registration />);
storiesOf('Login', module).add('Login', () => <Login />);
