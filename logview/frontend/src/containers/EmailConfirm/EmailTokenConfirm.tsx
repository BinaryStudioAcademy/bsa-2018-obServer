import * as React from 'react';
import { Link } from 'react-router-dom';
import {
	Title,
	Submit,
	PasswordWrapper,
	PasswordResetContainer,
	CenteredText
} from '../../styles/Styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userEmailActivation } from 'src/redux/user/actions';
import { History } from 'history';
import queryString from 'query-string';

interface EmailTokenProps {
	history: History;
	actions: { userEmailActivation: Function };
	isLoggedIn: boolean;
	fetchingUserStatus: string;
}

interface EmailTokenState {}

class EmailTokenConfirm extends React.Component<
	EmailTokenProps,
	EmailTokenState
> {
	constructor(props: any) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.props.actions.userEmailActivation(
			queryString.parse(location.search).activationToken
		);
	}

	render() {
		const { isLoggedIn, fetchingUserStatus } = this.props;
		return (
			(fetchingUserStatus === 'success' ||
				fetchingUserStatus === 'failed') && (
				<PasswordResetContainer>
					<PasswordWrapper>
						{isLoggedIn ? (
							<React.Fragment>
								<Title>Email Successfully Confirmed!</Title>
								// seems link within button doesn't work with
								Firefox
								<Submit>
									<Link to="/dashboard/quickstart">
										Proceed to Quickstart
									</Link>
								</Submit>
							</React.Fragment>
						) : (
							<React.Fragment>
								<Title>
									Sorry, your email couldn't be confirmed!
								</Title>
								<CenteredText>
									Try following the link again, please!
								</CenteredText>
							</React.Fragment>
						)}
					</PasswordWrapper>
				</PasswordResetContainer>
			)
		);
	}
}

const mapStateToProps = ({ fetchingUserStatus, isLoggedIn }) => ({
	fetchingUserStatus,
	isLoggedIn
});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ userEmailActivation }, dispatch)
});

const EmailTokenConfirmConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(EmailTokenConfirm);

export default EmailTokenConfirmConnected;
