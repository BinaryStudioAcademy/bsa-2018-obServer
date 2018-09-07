import * as React from 'react';
import { Link } from 'react-router-dom';
import {
	Title,
	Submit,
	PasswordWrapper,
	RedirectLink
} from '../../styles/Styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userEmailActivation } from '../../redux/user/actions';
import { History } from 'history';
import queryString from 'query-string';
import { LandingColumn } from '../../styles/ContainerStyles';

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
		const { fetchingUserStatus } = this.props;
		return (
			(fetchingUserStatus === 'success' ||
				fetchingUserStatus === 'failed') && (
				<LandingColumn>
					<Title>Email Successfully Confirmed!</Title>
					<RedirectLink>
						<Link to="/dashboard/quickstart">
							Proceed to Quickstart
						</Link>
					</RedirectLink>
				</LandingColumn>
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
