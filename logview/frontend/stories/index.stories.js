import React from 'react';
import { storiesOf } from '@storybook/react';
import Home from '../src/containers/Home/Home';
import Login from '../src/containers/Login/Login';

storiesOf('Home', module).add('Home', () => <Home />);
storiesOf('Login', module).add('Login', () => <Login />);
