import * as React from 'react';
import { Link } from 'react-router-dom';
import {
	PasswordResetContainer,
	PasswordWrapper,
	Title,
	Submit,
	CenteredText
} from '../../styles/Styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userEmailActivation } from 'src/redux/user/actions';
import { History } from 'history';

interface EmailTokenProps {
	history: History;
	actions: { userEmailActivation: Function };
}

interface EmailTokenState {
	confirmed: boolean;
}

class EmailTokenConfirm extends React.Component<
	EmailTokenProps,
	EmailTokenState
> {
	constructor(props: any) {
		super(props);

		this.state = {
			confirmed: false
		};
	}

	componentDidMount() {
		this.props.actions.userEmailActivation(
			this.props.history.location.search.split('=')[1]
		);
		this.setState({ confirmed: true });
	}

	render() {
		return (
			<PasswordResetContainer>
				<PasswordWrapper>
					{this.state.confirmed ? (
						<React.Fragment>
							<Title>Email Successfully Confirmed!</Title>
							<p>Some sort of image will be here</p>
							<Submit>
								<Link to="/dashboard/quickstart">
									Proceed to Quickstart
								</Link>
							</Submit>
						</React.Fragment>
					) : (
						<React.Fragment>
							<div>
								<Title>
									Sorry, your email couldn't be confirmed!
								</Title>
								<CenteredText>
									Try following the link again, please!
								</CenteredText>
							</div>
							<p>Some sort of image will be here</p>
						</React.Fragment>
					)}
				</PasswordWrapper>
			</PasswordResetContainer>
		);
	}
}

const mapStateToProps = ({ fetchingUserStatus }) => ({
	fetchingUserStatus
});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ userEmailActivation }, dispatch)
});

const EmailTokenConfirmConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(EmailTokenConfirm);

export default EmailTokenConfirmConnected;
