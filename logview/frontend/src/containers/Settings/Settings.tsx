import * as React from 'react';
import SettingCheckBox from 'src/components/settings/SettingCheckBox';

class Settings extends React.Component {
	render() {
		return (
			<React.Fragment>
				<a href="http://localhost:3060/dashboard/settings/user">
					User Settings
				</a>
				<br />
				<a href="http://localhost:3060/dashboard/settings/data">
					Data Settings
				</a>
			</React.Fragment>
		);
	}
}

export default Settings;
