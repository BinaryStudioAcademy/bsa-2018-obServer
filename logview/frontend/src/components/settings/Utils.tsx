import * as React from 'react';
import { Copy } from 'styled-icons/fa-solid';
import { AppSecretKey } from '../../styles/SettingsFormStyles';
import { copyToClipboard } from '../../services/clipboard';

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
