import React from 'react';
import { storiesOf } from '@storybook/react';
import Registration from 'src/containers/Registration/Registration';
import Login from 'src/containers/Login/Login';

storiesOf('Registration', module).add('Registration', () => <Registration />);
storiesOf('Login', module).add('Login', () => <Login />);
