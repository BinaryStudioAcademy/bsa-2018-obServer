import * as React from 'react';
import Loader from 'react-loader-spinner';
import { LoaderWrapper } from '../../styles/LoaderStyles';

export class LoaderPuff extends React.Component {
	render() {
		return (
			<LoaderWrapper>
				<Loader type="Puff" color="#7f78ce" height="100" width="100" />
			</LoaderWrapper>
		);
	}
}

export class LoaderBars extends React.Component {
	render() {
		return (
			<LoaderWrapper>
				<Loader type="Bars" color="#7f78ce" height="100" width="100" />
			</LoaderWrapper>
		);
	}
}

export class LoaderOval extends React.Component {
	render() {
		return (
			<LoaderWrapper>
				<Loader type="Oval" color="#7f78ce" height="100" width="100" />
			</LoaderWrapper>
		);
	}
}
