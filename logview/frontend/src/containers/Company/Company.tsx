import * as React from 'react';
import { Input, Submit, ErrorText, CompanyUsers, InviteForm, PlusCircleIcon, TimesCircleIcon, FormStatusIcon, UserItem } from './CompanyStyles';
import { fetchCompanyUsers } from 'src/redux/company/actions';
import { userInvite } from 'src/redux/user/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserSingle from './UserSingle';
import { Title } from '../../styles/Styles';

interface CompanyProps {
	actions: { userInvite: Function; fetchCompanyUsers: Function };
	companyUsers: Array<Object>;
	fetchingUserStatus: string;
}

interface CompanyState {
	email?: string;
	name?: string;
	err?: boolean;
	form?: boolean;
}

class Company extends React.Component<CompanyProps, CompanyState> {
	constructor(props: any) {
		super(props);

		this.state = {
			email: '',
			name: '',
			err: false,
			form: false
		};

		this.handleFieldChange = this.handleFieldChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleForm = this.handleForm.bind(this);
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
		this.setState({ form: !this.state.form })
	}

	handleForm() {
		this.setState({ form: !this.state.form })
	}

	render() {
		const { companyUsers } = this.props;
		console.log(this.props);
		return (
			<CompanyUsers>
				<FormStatusIcon >
					{!this.state.form ? <PlusCircleIcon size="40" onClick={this.handleForm}/> : <TimesCircleIcon size="40" onClick={this.handleForm}/>}
				</FormStatusIcon>
				
				
				{this.state.form &&
					<InviteForm>
						<Title>Invite user</Title>
						<Input
							name="name"
							placeholder="name"
							onChange={this.handleFieldChange}
						/>
						<Input
							name="email"
							placeholder="email"
							onChange={this.handleFieldChange}
						/>
						<Submit onClick={this.handleSubmit}>
							{this.props.fetchingUserStatus === 'success'
								? 'Sent'
								: 'Invite'}
						</Submit>
					</InviteForm>}

				{companyUsers.length > 0 && 
					!this.state.form &&
					<React.Fragment>
						<UserItem>
							<p>name</p>
							<p>email</p>
							<p>status</p>
						</UserItem>
						{ companyUsers.map((companyUser: any, i) => (
							<UserSingle key={i} user={companyUser} />
						))}
					</React.Fragment>
				}
			</CompanyUsers>
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
