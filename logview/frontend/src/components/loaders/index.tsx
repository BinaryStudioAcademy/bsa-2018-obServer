import * as React from 'react';
import Loader from 'react-loader-spinner';

export class LoaderPuff extends React.Component {
	render() {
		return (
			<div style={{ textAlign: 'center', marginTop: '20%' }}>
				<Loader type="Puff" color="#7f78ce" height="100" width="100" />
			</div>
		);
	}
}

export class LoaderBars extends React.Component {
	render() {
		return (
			<div style={{ textAlign: 'center', marginTop: '20%' }}>
				<Loader type="Bars" color="#7f78ce" height="100" width="100" />
			</div>
		);
	}
}

export class LoaderOval extends React.Component {
	render() {
		return (
			<div style={{ textAlign: 'center', marginTop: '20%' }}>
				<Loader type="Oval" color="#7f78ce" height="100" width="100" />
			</div>
		);
	}
}
