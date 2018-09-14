import * as React from 'react';
import {
	Title,
	Wrapper,
	Logo,
	SubTitle,
	Button,
	Block
} from './NotFoundPageStyles';
import { Link } from 'react-router-dom';

const image = require('src/assets/not-found.png');

class NotFoundPage extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Wrapper>
					<Logo src={image} />
					<Block>
						<Title>404</Title>
						<SubTitle>This page does not exist</SubTitle>
						<Button>
							<Link to="/dashboard">Home</Link>
						</Button>
					</Block>
				</Wrapper>
			</React.Fragment>
		);
	}
}

export default NotFoundPage;
