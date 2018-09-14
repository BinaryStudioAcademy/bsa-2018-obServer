import * as React from 'react';
import {
	Input,
	Submit,
	ErrorText,
	CompanyUsers,
	InviteForm,
	PlusCircleIcon,
	TimesCircleIcon,
	FormStatusIcon,
	UserItem,
	Row,
	Status,
	AdminSwitchGrid
} from './CompanyStyles';
import { fetchCompanyUsers } from '../../redux/company/actions';
import { userInvite } from '../../redux/user/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserSingle from './UserSingle';
import { Title } from '../../styles/Styles';
import { IconContainer } from './UserSingleStyles';
import AdminCheckBox from '../../components/AdminCheckBox';
import { validateUsernameFrom } from 'src/services/validate/validate';

interface CompanyProps {
	actions: { userInvite: Function; fetchCompanyUsers: Function };
	companyUsers: Array<Object>;
	user: any;
	fetchingUserStatus: string;
}

interface CompanyState {
	email?: string;
	name?: string;
	err?: boolean;
	form?: boolean;
	admin?: boolean;
	validateState?: {
		name: boolean;
		email: boolean;
	};
}

class Company extends React.Component<CompanyProps, CompanyState> {
	constructor(props: any) {
		super(props);

		this.state = {
			email: '',
			name: '',
			err: false,
			form: false,
			admin: false,
			validateState: {
				name: true,
				email: true
			}
		};

		this.handleFieldChange = this.handleFieldChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleForm = this.handleForm.bind(this);
		this.handleCheckbox = this.handleCheckbox.bind(this);
	}

	componentDidMount() {
		this.props.actions.fetchCompanyUsers();
	}

	handleFieldChange(e: any) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleCheckbox() {
		this.setState({ admin: !this.state.admin });
	}

	handleSubmit(e: any) {
		e.preventDefault();
		let obj = {
			name: this.state.name,
			email: this.state.email
		};

		let validateState = validateUsernameFrom(obj);
		let errors = [];
		for (let errorStatus in validateState) {
			errors.push(validateState[errorStatus]);
		}
		errors.indexOf(false) !== -1
			? this.setState({ validateState: validateState })
			: (this.props.actions.userInvite(
					this.state.email,
					this.state.name,
					this.state.admin
			  ),
			  this.setState({ form: !this.state.form }));
	}

	handleForm() {
		this.setState({ form: !this.state.form });
	}

	render() {
		const { companyUsers } = this.props;
		return (
			<CompanyUsers>
				<Row>
					<Title>{this.props.user.company}</Title>
					<FormStatusIcon>
						{!this.state.form ? (
							<PlusCircleIcon
								size="40"
								onClick={this.handleForm}
							/>
						) : (
							<TimesCircleIcon
								size="40"
								onClick={this.handleForm}
							/>
						)}
					</FormStatusIcon>
				</Row>

				{this.state.form && (
					<InviteForm>
						<Title>Invite user</Title>
						<Input
							name="name"
							placeholder="name"
							onChange={this.handleFieldChange}
						/>
						{!this.state.validateState.name && (
							<ErrorText>
								Name can only contain latin letters
							</ErrorText>
						)}
						<Input
							name="email"
							placeholder="email"
							onChange={this.handleFieldChange}
						/>
						{!this.state.validateState.email && (
							<ErrorText>
								Email is not valid, ex. "email@domain.name"
							</ErrorText>
						)}
						<AdminSwitchGrid>
							<p>Admin:</p>
							<AdminCheckBox
								name="admin"
								checked={this.state.admin}
								onChange={this.handleCheckbox}
							/>
						</AdminSwitchGrid>
						<Submit onClick={this.handleSubmit}>
							{this.props.fetchingUserStatus === 'success'
								? 'Sent'
								: 'Invite'}
						</Submit>
					</InviteForm>
				)}

				{companyUsers.length > 0 &&
					!this.state.form && (
						<React.Fragment>
							<UserItem>
								<IconContainer>
									<p>admin</p>
								</IconContainer>
								<p>name</p>
								<p>email</p>
								<Status>status</Status>
							</UserItem>
							{companyUsers.map((companyUser: any, i) => (
								<UserSingle key={i} user={companyUser} />
							))}
						</React.Fragment>
					)}
			</CompanyUsers>
		);
	}
}

const mapStateToProps = ({ fetchingUserStatus, companyUsers, user }) => ({
	fetchingUserStatus,
	companyUsers,
	user
});
const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ userInvite, fetchCompanyUsers }, dispatch)
});

const CompanyConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(Company);

export default CompanyConnected;
