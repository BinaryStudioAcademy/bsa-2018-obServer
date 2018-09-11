import * as React from 'react';
import onClickOutside from 'react-onclickoutside';
import {
	Select as StyledSelect,
	OptionActive,
	Option,
	Dropdown
} from './SelectStyles';
import { ArrowDropDown } from 'styled-icons/material';

interface SelectState {
	popup: boolean;
	active: string;
}

interface SelectProps {
	active: string;
	options: Array<{ name: string; value: string }>;
	onActive: Function;
}

class Select extends React.Component<SelectProps, SelectState> {
	constructor(props: any) {
		super(props);

		this.state = {
			active: this.props.active,
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
		this.setState({ active: e.target.innerHTML });
		this.setState({ popup: !this.state.popup });
		this.props.onActive(e.target.innerHTML, e.target.title);
	}

	togglePopup() {
		this.setState({ popup: !this.state.popup });
	}

	render() {
		return (
			<StyledSelect popup={this.state.popup}>
				<OptionActive onClick={this.togglePopup}>
					{this.state.active}
					<ArrowDropDown size="20" />
				</OptionActive>
				{this.state.popup && (
					<Dropdown popup={this.state.popup}>
						{this.props.options.map((option, i) => (
							<Option key={i} onClick={this.handleClick}>
								<span title={option.value}>{option.name}</span>
							</Option>
						))}
					</Dropdown>
				)}
			</StyledSelect>
		);
	}
}

export default onClickOutside(Select);
