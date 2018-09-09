import * as React from 'react';

export class Tips extends React.Component {
	render() {
		return (
			<div style={{ textAlign: 'center' }}>
				<em>Tip: Hold shift when sorting to multi-sort!</em>
			</div>
		);
	}
}

interface MethodProps {
	method: number;
}

export class Method extends React.Component<MethodProps, {}> {
	constructor(props) {
		super(props);
		this.switchColor = this.switchColor.bind(this);
	}

	switchColor() {
		switch (this.props.method) {
			case 0:
				return 'red';
			case 1:
				return 'orange';
			case 2:
				return 'green';
			case 3:
				return 'skyblue';
			case 4:
				return 'black';
			case 5:
				return 'grey';
			default:
				return 'white';
		}
	}

	switchText() {
		switch (this.props.method) {
			case 0:
				return 'ERROR';
			case 1:
				return 'WARN';
			case 2:
				return 'INFO';
			case 3:
				return 'VERBOSE';
			case 4:
				return 'DEBUG';
			case 5:
				return 'SILLY';
			default:
				return '';
		}
	}

	render() {
		return (
			<span
				style={{
					color: this.switchColor(),
					transition: 'all .3s ease'
				}}
			>
				{this.switchText()}
			</span>
		);
	}
}
