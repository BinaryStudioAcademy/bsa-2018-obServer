import * as React from 'react';
import { Timer } from 'styled-icons/material';
import onClickOutside from 'react-onclickoutside';
import {
	Select as StyledSelect,
	OptionActive,
	Option,
	Dropdown
} from './UpdateTimerStyles';
// import { ArrowDropDown } from 'styled-icons/material';
// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleTimeRange } from 'src/redux/logs/actions';

const options = [
	'last 10 minutes',
	'last 30 minutes',
	'last hour',
	'last 5 hours',
	'last 12 hours',
	'last 24 hours',
	'last week',
	'last 30 days'
];

interface UpdateTimerState {
	popup: boolean;
}

interface UpdateTimerProps {
	actions: {
		handleTimeRange: Function;
	};
	caller: string;
	activeInterval: string;
}

class UpdateTimer extends React.Component<UpdateTimerProps, UpdateTimerState> {
	constructor(props: any) {
		super(props);

		this.state = {
			popup: false
		};

		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.togglePopup = this.togglePopup.bind(this);
	}

	handleClickOutside() {
		this.setState({ popup: false });
	}

	handleClick(e) {
		this.setState({ popup: !this.state.popup });
		this.props.actions.handleTimeRange({
			[this.props.caller]: e.target.innerHTML
		});
	}

	togglePopup() {
		this.setState({ popup: !this.state.popup });
	}

	render() {
		return (
			<StyledSelect popup={this.state.popup}>
				<OptionActive onClick={this.togglePopup}>
					<Timer size="25" />
					{this.props.activeInterval}
				</OptionActive>
				{this.state.popup && (
					<Dropdown popup={this.state.popup}>
						{options.map((option, i) => (
							<Option key={i} onClick={this.handleClick}>
								<span>{option}</span>
							</Option>
						))}
					</Dropdown>
				)}
			</StyledSelect>
		);
	}
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ handleTimeRange }, dispatch)
});

const UpdateTimerConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(onClickOutside(UpdateTimer));

export default UpdateTimerConnected;
