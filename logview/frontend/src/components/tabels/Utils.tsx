import * as React from 'react';
import { Trash, Edit, Copy } from 'styled-icons/fa-solid';
import {
	AppSecretKey,
	DeleteAppRow,
	EditAppRow
} from '../../styles/SettingsFormStyles';
import { copyToClipboard } from '../../services/clipboard';

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
	method: string;
}

export class Method extends React.Component<MethodProps, {}> {
	constructor(props) {
		super(props);
		this.switchColor = this.switchColor.bind(this);
	}

	switchColor() {
		switch (this.props.method) {
			case 'GET':
				return '#57d500';
			case 'POST':
				return '#ff9900';
			case 'PUT':
				return '#3366ff';
			case 'PATCH':
				return '#8C8C8C';
			case 'DELETE':
				return '#ff2e00';
			default:
				return '#8C8C8C';
		}
	}

	render() {
		return (
			<span>
				<span
					style={{
						color: this.switchColor(),
						transition: 'all .3s ease'
					}}
				>
					&#x25cf;
				</span>
				{`  `}
				{this.props.method}
			</span>
		);
	}
}

interface SecretKeyProps {
	secretKey: string;
}

export class SecretKey extends React.Component<SecretKeyProps, {}> {
	constructor(props) {
		super(props);
		this.copyClick = this.copyClick.bind(this);
	}

	icons: {
		bookmark?: any;
	} = {};

	copyClick() {
		copyToClipboard(this.props.secretKey);
		alert(`Key '${this.props.secretKey}' copied to clipboard!`);
	}

	render() {
		return (
			<AppSecretKey
				title="click to copy"
				onClick={() => {
					this.copyClick();
				}}
			>
				<Copy size={18} />
				{this.props.secretKey}
			</AppSecretKey>
		);
	}
}

interface DeleteAppProps {
	secretKey: string;
	handleClick: Function;
}

export class DeleteApp extends React.Component<DeleteAppProps, {}> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<DeleteAppRow
				onClick={() => {
					this.props.handleClick(this.props.secretKey);
				}}
			>
				<Trash size={18} />
			</DeleteAppRow>
		);
	}
}
