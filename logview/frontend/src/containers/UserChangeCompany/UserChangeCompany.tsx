import * as React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userChangeCompany } from '../../redux/company/actions';
import { Button, Logo, Title, Landing } from './UserChangeCompanyStyle';
import queryString from 'query-string';
const logo = require('src/assets/invite.png');

interface UserChangeCompanyProps {
	actions: {
		userChangeCompany: Function;
	};
}

interface UserChangeCompanyState {}

class UserChangeCompany extends React.Component<
	UserChangeCompanyProps,
	UserChangeCompanyState
> {
	componentDidMount() {
		this.props.actions.userChangeCompany(
			queryString.parse(location.search).inviteToken
		);
	}

	render() {
		return (
			<Landing>
				<Logo src={logo} />
				<Title>You joined to companyName</Title>
				<Button>
					<Link to="/">Proceed to home</Link>
				</Button>
			</Landing>
		);
	}
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ userChangeCompany }, dispatch)
});

const UserChangeCompanyConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(UserChangeCompany);

export default UserChangeCompanyConnected;
