import * as React from 'react';
import onClickOutside from 'react-onclickoutside';
import { Select as StyledSelect, OptionActive, Option } from './SelectStyles';
import { ArrowDropDown } from 'styled-icons/material';

interface SelectState {
    popup: boolean;
}

interface SelectProps {
    active: string;
    options: Array<string>
}

class Select extends React.Component<SelectProps, SelectState> {
	constructor(props: any) {
		super(props);

		this.state = {
            popup: false,
		};

		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.togglePopup = this.togglePopup.bind(this);
	}

	handleClickOutside(evt) {
		this.setState({ popup: false });
	}

	togglePopup() {
		this.setState({ popup: !this.state.popup });
	}

	render() {
		return (
			<StyledSelect popup={this.state.popup}>
				<OptionActive onClick={this.togglePopup}>
					{this.props.active}
					<ArrowDropDown size="20" />
				</OptionActive>
				{this.state.popup && (
					<React.Fragment>
                        {this.props.options.map( (option, i) => <Option key={i}><span>{option}</span></Option>)}
					</React.Fragment>
				)}
			</StyledSelect>
		);
	}
}

export default onClickOutside(Select);
