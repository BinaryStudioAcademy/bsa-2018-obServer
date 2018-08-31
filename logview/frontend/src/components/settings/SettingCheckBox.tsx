import * as React from 'react';
import {
	CheckBoxInput,
	CheckBoxSlider,
	CheckBoxSwitch,
	CheckBoxSwitchLabel,
	CheckBoxSwitchWrapper
} from '../../styles/SettingsFormStyles';

interface SettingCheckBoxProps {
	name?: string;
	label?: string;
	checked?: boolean;
	onChange?: any;
}

class SettingCheckBox extends React.Component<SettingCheckBoxProps, {}> {
	render() {
		return (
			<CheckBoxSwitchWrapper>
				<CheckBoxSwitch>
					<CheckBoxInput
						type="checkbox"
						name={this.props.name}
						checked={this.props.checked}
						onChange={this.props.onChange}
					/>
					<CheckBoxSlider />
				</CheckBoxSwitch>
				<CheckBoxSwitchLabel>{this.props.label}</CheckBoxSwitchLabel>
			</CheckBoxSwitchWrapper>
		);
	}
}

export default SettingCheckBox;
