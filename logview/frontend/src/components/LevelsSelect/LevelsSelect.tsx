import * as React from 'react';
import onClickOutside from 'react-onclickoutside';
import {
	Select as StyledSelect,
	OptionActive,
	Option,
	Dropdown,
	ActiveStatusIcon,
	Span
} from './LevelsSelectStyles';
import { ArrowDropDown } from 'styled-icons/material';
// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleLogLevels } from '../../redux/logs/actions';
import { FiltersState } from '../../types/LogsState';

interface SelectState {
	popup: boolean;
}

interface SelectProps {
	actions: {
		handleLogLevels: Function;
	};
	filters: FiltersState;
}

const keys = ['error', 'warn', 'info', 'verbose', 'debug', 'silly'];

class Select extends React.Component<SelectProps, SelectState> {
	constructor(props: any) {
		super(props);

		this.state = {
			popup: false
		};

		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.togglePopup = this.togglePopup.bind(this);
	}

	handleClickOutside(evt) {
		this.setState({ popup: false });
	}

	handleClick(e) {
		this.props.actions.handleLogLevels({
			[e.target.title]: !this.props.filters.logLevels[e.target.title]
		});
	}

	togglePopup() {
		this.setState({ popup: !this.state.popup });
	}

	render() {
		return (
			<StyledSelect popup={this.state.popup}>
				<OptionActive onClick={this.togglePopup}>
					Select levels
					<ArrowDropDown size="20" />
				</OptionActive>
				{this.state.popup && (
					<Dropdown popup={this.state.popup}>
						{keys.map((option, i) => (
							<Option key={i} onClick={this.handleClick}>
								<ActiveStatusIcon
									size="10"
									active={
										this.props.filters.logLevels[option]
									}
								/>
								<Span
									title={keys[i]}
									active={
										this.props.filters.logLevels[option]
									}
								>
									{option}
								</Span>
							</Option>
						))}
					</Dropdown>
				)}
			</StyledSelect>
		);
	}
}

const mapStateToProps = ({ filters }) => ({
	filters
});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ handleLogLevels }, dispatch)
});

const SelectConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(onClickOutside(Select));

export default SelectConnected;
