import React from 'react';
import { storiesOf } from '@storybook/react';
import App from '../src/containers/App/App';
import Registration from '../src/containers/Registration/Registration';

storiesOf('App', module).add('App', () => <App msg="Hello World" />);
storiesOf('Registration', module).add('Registration', () => <Registration />);
