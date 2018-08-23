import * as React from 'react';
import { UserEdit, Database } from 'styled-icons/fa-solid';

class Settings extends React.Component {
	render() {
		return (
			<React.Fragment>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						textAlign: 'center'
					}}
				>
					<a
						href="http://localhost:3060/dashboard/settings/user"
						style={{ textAlign: 'center' }}
					>
						<UserEdit size="128" />
						<br />
						User Settings
					</a>
					<a
						href="http://localhost:3060/dashboard/settings/data"
						style={{ textAlign: 'center' }}
					>
						<Database size="128" />
						<br />
						Data Settings
					</a>
				</div>
			</React.Fragment>
		);
	}
}

export default Settings;
