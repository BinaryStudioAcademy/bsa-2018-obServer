import * as React from 'react';
import onClickOutside from "react-onclickoutside";
import { 	Select,
	OptionActive,
	Option} from './ServerResourcesStyles'; 
import { ArrowDropDown } from 'styled-icons/material';


interface AppSelectState {
	popup: boolean;
}

class AppSelect extends React.Component<{}, AppSelectState> {
    constructor(props: any) {
        super(props)
        
        this.state = {
            popup: false
        }

		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.togglePopup = this.togglePopup.bind(this);
    }

	handleClickOutside(evt) {
		this.setState({popup: false})
    }
    

	togglePopup() {
		this.setState({ popup: !this.state.popup });
	}

    render() {
        return (
            <Select
                popup={this.state.popup}
            >
                <OptionActive onClick={this.togglePopup}>
                    General
                    <ArrowDropDown size="20"/>
                </OptionActive>
                {this.state.popup && (
                    <React.Fragment>
                        <Option>
                            <span>app1</span>
                        </Option>
                        <Option>
                            <span>app2</span>
                        </Option>
                        <Option>
                            <span>app3</span>
                        </Option>
                    </React.Fragment>
                )}
            </Select>
        )
    }
}

export default onClickOutside(AppSelect);