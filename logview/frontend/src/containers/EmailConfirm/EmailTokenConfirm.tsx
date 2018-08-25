import * as React from 'react';
import { Link } from 'react-router-dom';
import { Title, Submit } from '../../styles/Styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userEmailActivation } from 'src/redux/user/actions';
import { History } from 'history';
import queryString from 'query-string';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
			queryString.parse(location.search).resetToken
		);
	}

	render() {
		const { isLoggedIn, fetchingUserStatus } = this.props;
		return (
			(fetchingUserStatus === 'success' ||
				fetchingUserStatus === 'failed') && (
				<React.Fragment>
					{isLoggedIn ? (
						<React.Fragment>
							<Title>Email Successfully Confirmed!</Title>
							<Link to="/dashboard/quickstart">
								Proceed to Quickstart
							</Link>
						</React.Fragment>
					) : (
						<React.Fragment>
							<div>
								<Title>
									Sorry, your email couldn't be confirmed!
								</Title>
								<p>Try following the link again, please!</p>
							</div>
							<p>Some sort of image will be here</p>
						</React.Fragment>
					)}
				</React.Fragment>
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
