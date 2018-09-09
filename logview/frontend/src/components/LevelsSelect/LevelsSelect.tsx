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
import Options from './LevelsSelectTypes';

interface SelectState {
	popup: boolean;
	options: Array<Options>;
}

interface SelectProps {
	options: Array<Options>;
	onActive: Function;
}

class Select extends React.Component<SelectProps, SelectState> {
	constructor(props: any) {
		super(props);

		this.state = {
			popup: false,
			options: []
		};

		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.togglePopup = this.togglePopup.bind(this);
	}

	componentDidMount() {
		this.setState({ options: this.props.options });
	}

	handleClickOutside(evt) {
		this.setState({ popup: false });
	}

	handleClick(e) {
		const newOptions = this.state.options.map(el => {
			if (el.value === e.target.title) {
				el.active = !el.active;
			}
			return el;
		});
		this.setState({ options: newOptions });
		this.props.onActive(newOptions);
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
						{this.props.options.map((option, i) => (
							<Option key={i}>
								<ActiveStatusIcon
									size="10"
									active={this.state.options[i].active}
								/>
								<Span
									title={option.value}
									active={this.state.options[i].active}
									onClick={this.handleClick}
								>
									{option.name}
								</Span>
							</Option>
						))}
					</Dropdown>
				)}
			</StyledSelect>
		);
	}
}

export default onClickOutside(Select);
