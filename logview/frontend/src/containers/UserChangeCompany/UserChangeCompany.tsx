import * as React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userChangeCompany } from 'src/redux/company/actions';


interface UserChangeCompanyProps {
	actions: {
		userChangeCompany: Function;
	};
}

interface UserChangeCompanyState {

}

class UserChangeCompany extends React.Component<UserChangeCompanyProps, UserChangeCompanyState> {
    componentDidMount() {
        this.props.actions.userChangeCompany();
    }

    render() {
        return (
            <React.Fragment>
                <div>You joined *company*</div>
                <Link to="/dashboard">Proceed to dashboard</Link>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ }) => ({

});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators(
		{ userChangeCompany },
		dispatch
	)
});

const UserChangeCompanyConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(UserChangeCompany);

export default UserChangeCompanyConnected;
