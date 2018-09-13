import * as React from 'react';
import {
	CheckBoxSwitchAdmin,
	CheckBoxSwitchLabel,
	CheckBoxSwitchWrapperAdmin,
	CheckBoxSliderAdmin,
	CheckBoxInputAdmin
} from '../styles/SettingsFormStyles';

interface SettingCheckBoxProps {
	name?: string;
	label?: string;
	checked?: boolean;
	onChange?: any;
}

class AdminCheckBox extends React.Component<SettingCheckBoxProps, {}> {
	render() {
		return (
			<CheckBoxSwitchWrapperAdmin>
				<CheckBoxSwitchAdmin>
					<CheckBoxInputAdmin
						type="checkbox"
						name={this.props.name}
						checked={this.props.checked}
						onChange={this.props.onChange}
					/>
					<CheckBoxSliderAdmin />
				</CheckBoxSwitchAdmin>
				<CheckBoxSwitchLabel>{this.props.label}</CheckBoxSwitchLabel>
			</CheckBoxSwitchWrapperAdmin>
		);
	}
}

export default AdminCheckBox;
