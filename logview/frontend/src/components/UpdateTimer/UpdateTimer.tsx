import * as React from 'react';
import { Timer } from 'styled-icons/material';
import Select from '../Select/Select';
import onClickOutside from 'react-onclickoutside';
import { Select as StyledSelect, OptionActive, Option, Dropdown } from '../Select/SelectStyles';
import { ArrowDropDown } from 'styled-icons/material';
const options = ['last 10 minutes', 'last 30 minutes', 'last 1 hour', 'last 5 hours', 'last 12 hours', 'last day', 'last week', 'last month'];

interface UpdateTimerState {
	popup: boolean;
	active: string;
}

interface UpdateTimerProps {
	active: string;
	options: Array<string>;
	onActive: Function;
}

class UpdateTimer extends React.Component<UpdateTimerProps, UpdateTimerState> {
    constructor(props: any) {
		super(props);

		this.state = {
			active: '',
			popup: false
		};

		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.togglePopup = this.togglePopup.bind(this);
	}

	componentDidMount() {
		this.setState({ active: options[0] });
	}

	handleClickOutside(evt) {
		this.setState({ popup: false });
	}

	handleClick(e) {
		this.setState({ active: e.target.innerHTML });
		this.setState({ popup: !this.state.popup });
		this.props.onActive(e.target.innerHTML);
	}

	togglePopup() {
		this.setState({ popup: !this.state.popup });
	}

    handleActive(data) {
        this.setState({active: data})
    }

    render() {
        return (
            <React.Fragment>
                <StyledSelect popup={this.state.popup}>
                    <OptionActive onClick={this.togglePopup}>
                        {this.state.active}
                        <ArrowDropDown size="20" />
                    </OptionActive>
                    {this.state.popup && (
                        <Dropdown popup={this.state.popup}>
                            {options.map( (option, i) => <Option key={i} onClick={this.handleClick}><span>{option}</span></Option>)}
                        </Dropdown>
                    )}
                </StyledSelect>
            </React.Fragment>
        )
    }
}

export default onClickOutside(UpdateTimer);