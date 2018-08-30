import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { UserState } from 'src/types/UserState';
import {
	Background,
	PasswordResetContainer,
	CenteredText,
	Title,
	EmailContainer
} from '../../styles/Styles';

interface EmailConfirmState {}

interface EmailConfirmProps {
	user: UserState;
}

class EmailConfirm extends React.Component<
	EmailConfirmProps,
	EmailConfirmState
> {
	constructor(props: any) {
		super(props);
	}

	componentDidMount() {}

	render() {
		let user = this.props.user;

		return (
			<Background>
				<PasswordResetContainer>
					<EmailContainer>
						<Title>Email sent!</Title>
						<CenteredText>
							We've sent an email to <b>{user.email}</b> to
							confirm validity of your email address. After
							receiving the email, follow the link provided to
							complete the registration
						</CenteredText>
					</EmailContainer>
				</PasswordResetContainer>
			</Background>
		);
	}
}

const mapStateToProps = ({ fetchingUserStatus, user }) => ({
	fetchingUserStatus,
	user
});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({}, dispatch)
});

const EmailConfirmConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(EmailConfirm);

export default EmailConfirmConnected;
