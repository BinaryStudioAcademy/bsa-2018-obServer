import * as React from 'react';
import { Link } from 'react-router-dom';
import {
	Background,
	PasswordResetContainer,
	PasswordWrapper
} from '../../styles/Styles';
const sendIcon = require('src/assets/confirm-icon.png');

class EmailTokenConfirm extends React.Component {
	constructor(props: any) {
		super(props);
	}

	componentDidMount() {}

	render() {
		return (
			<Background>
				<PasswordResetContainer>
					<PasswordWrapper>nub</PasswordWrapper>
				</PasswordResetContainer>
			</Background>
		);
	}
}

export default EmailTokenConfirm;
