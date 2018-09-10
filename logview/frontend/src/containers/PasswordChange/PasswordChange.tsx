import * as React from 'react';
import {
	Submit,
	Title,
	ErrorText,
	CenteredContainer
} from '../../styles/Styles';
import { userChangePassword, userSetPassword } from '../../redux/user/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { History } from 'history';
import { RouteComponentProps } from 'react-router-dom';
import { validate } from '../../services/validate/validate';
import queryString from 'query-string';
import { Input } from '../../styles/InputStyles';
import { Landing, LandingColumn } from '../../styles/ContainerStyles';

interface PasswordChangeProps {
	history: History;
	actions: {
		userChangePassword: Function;
		userSetPassword: Function;
	};
}

interface PasswordChangeState {
	newpassword?: string;
	confirmpassword?: string;
	err?: string;
	sent?: boolean;
}

interface MatchParams {}

interface MatchProps extends RouteComponentProps<MatchParams> {}

class PasswordChange extends React.Component<
	PasswordChangeProps & MatchProps,
	PasswordChangeState
> {
	constructor(props: any) {
		super(props);

		this.state = {
			newpassword: '',
			confirmpassword: '',
			err: '',
			sent: false
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFieldChange = this.handleFieldChange.bind(this);
	}

	componentDidMount() {}

	handleSubmit() {
		let token = queryString.parse(location.search).resetToken;

		if (!validate('password', this.state.newpassword)) {
			this.setState({
				err: 'password must be at least 8 characters long'
			});
		} else if (this.state.newpassword !== this.state.confirmpassword) {
			this.setState({ err: "passwords doesn't match" });
		} else if (this.props.match.url === '/change/') {
			this.setState({ err: '', sent: true });
			this.props.actions.userChangePassword(
				this.state.newpassword,
				token
			);
		} else if (this.props.match.url === '/setpassword/') {
			let token = queryString.parse(location.search).inviteToken;
			this.props.actions.userSetPassword(this.state.newpassword, token);
		}
	}

	handleFieldChange(e: any) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { match } = this.props;
		return (
			<LandingColumn>
				<CenteredContainer>
					{!this.state.sent ? (
						<React.Fragment>
							<Title>
								{match.url === '/change'
									? 'Change password'
									: 'Set password'}
							</Title>
							<Input
								name="newpassword"
								placeholder="new password"
								type="password"
								value={this.state.newpassword}
								onChange={this.handleFieldChange}
							/>
							<ErrorText>{this.state.err}</ErrorText>
							<Input
								name="confirmpassword"
								placeholder="confirm password"
								type="password"
								value={this.state.confirmpassword}
								onChange={this.handleFieldChange}
							/>
							<Submit onClick={this.handleSubmit}>
								{match.url === '/change/' ? 'Change' : 'Send'}
							</Submit>
						</React.Fragment>
					) : (
						<React.Fragment>
							<Title>
								{match.url === '/change/'
									? 'Changed!'
									: 'Sent!'}
							</Title>
							<p>There will be an image here</p>
						</React.Fragment>
					)}
				</CenteredContainer>
			</LandingColumn>
		);
	}
}

const mapStateToProps = ({ fetching }) => ({
	fetching
});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators(
		{ userChangePassword, userSetPassword },
		dispatch
	)
});

const PasswordChangeConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(PasswordChange);

export default PasswordChangeConnected;
