import * as React from 'react';
import { Input, Submit, ErrorText } from '../../styles/Styles';
import { fetchCompanyUsers } from 'src/redux/company/actions';
import { userInvite } from 'src/redux/user/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RouteComponentProps } from 'react-router-dom';
import UserSingle from './UserSingle';
import { CompanyUsers, UserItem } from '../../styles/ContainerStyles';

interface CompanyProps {
	actions: { userInvite: Function; fetchCompanyUsers: Function };
	companyUsers: Array<Object>;
	fetchingUserStatus: string;
}

interface CompanyState {
	email?: string;
	name?: string;
	err?: boolean;
}

class Company extends React.Component<CompanyProps, CompanyState> {
	constructor(props: any) {
		super(props);

		this.state = {
			email: '',
			name: '',
			err: false
		};

		this.handleFieldChange = this.handleFieldChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	componentDidMount() {
		this.props.actions.fetchCompanyUsers();
	}

	handleFieldChange(e: any) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleSubmit(e: any) {
		e.preventDefault();

		this.props.actions.userInvite(this.state.email, this.state.name);
	}

	handleLogout() {}

	render() {
		console.log(this.props);
		const { companyUsers } = this.props;
		return (
			<React.Fragment>
				<h2>Invite user</h2>
				<Input
					name="email"
					placeholder="email"
					onChange={this.handleFieldChange}
				/>
				<Input
					name="name"
					placeholder="name"
					onChange={this.handleFieldChange}
				/>
				<Submit onClick={this.handleSubmit}>
					{this.props.fetchingUserStatus === 'success'
						? 'Sent'
						: 'Invite'}
				</Submit>
				<ErrorText>
					{this.props.fetchingUserStatus === 'failed'
						? 'There was an error processing your request'
						: ''}
				</ErrorText>
				<CompanyUsers>
					<UserItem>
						<p>name</p>
						<p>email</p>
						<p>status</p>
					</UserItem>
					{companyUsers.length > 1
						? companyUsers.map((companyUser: any, i) => (
								<UserSingle key={i} user={companyUser} />
						  ))
						: undefined}
				</CompanyUsers>
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({ fetchingUserStatus, companyUsers }) => ({
	fetchingUserStatus,
	companyUsers
});
const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ userInvite, fetchCompanyUsers }, dispatch)
});

const CompanyConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(Company);

export default CompanyConnected;
