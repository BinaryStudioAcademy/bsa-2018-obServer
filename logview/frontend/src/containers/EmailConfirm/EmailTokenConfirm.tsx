import * as React from 'react';
import { Link } from 'react-router-dom';
import {
	Background,
	PasswordResetContainer,
	PasswordWrapper
} from '../../styles/Styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userEmailActivation } from 'src/redux/user/actions';
const sendIcon = require('src/assets/confirm-icon.png');

interface EmailTokenProps {
	actions: { userEmailActivation: Function };
}

interface EmailTokenState {}

class EmailTokenConfirm extends React.Component<
	EmailTokenProps,
	EmailTokenState
> {
	constructor(props: any) {
		super(props);
	}

	componentDidMount() {
		this.props.actions.userEmailActivation(
			this.props.history.location.search.split('=')[1]
		);
	}

	render() {
		return (
			<Background>
				<PasswordResetContainer>
					<PasswordWrapper>Email Confirm Component </PasswordWrapper>
				</PasswordResetContainer>
			</Background>
		);
	}
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ userEmailActivation }, dispatch)
});

const EmailTokenConfirmConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(EmailTokenConfirm);

export default EmailTokenConfirmConnected;
