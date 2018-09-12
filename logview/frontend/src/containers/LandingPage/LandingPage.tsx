import * as React from 'react';
import {
	Background,
	Title,
	Slogan,
	Button,
	ObserverIcon,
	LandingPageWrapper,
	LandingMain,
	ButtonWrapper,
	ChatsShowcaseLeft,
	ChatsShowcaseRight
} from './LandingPageStyles';
import Particles from 'react-particles-js';
import config from './particlesjs-config';
import { Link } from 'react-router-dom';
const cpuChart = require('src/assets/LandingChartMock.png');

class LandingPage extends React.Component {
	render() {
		return (
			<LandingPageWrapper>
				<Background>
					<Particles params={config} width="100%" height="60vh" />
					<LandingMain>
						<Title>
							<ObserverIcon size="60" color="#3d3d3d" />
							obServer
						</Title>
						<Slogan>You code. We track.</Slogan>
						<ButtonWrapper>
							<Button primary>
								<Link to="/login">sign in</Link>
							</Button>
							<Button>
								<Link to="/register">sign up</Link>
							</Button>
						</ButtonWrapper>
						
					</LandingMain>
				</Background>
				
				
				<div>
					<ChatsShowcaseLeft>
						<div>
							<img src={cpuChart} width="540px" />
						</div>
						<div>
							desc
						</div>
					</ChatsShowcaseLeft>
					<ChatsShowcaseRight>
						<div>
							desc
						</div>
						<div>graphic right</div>
					</ChatsShowcaseRight>
					<ChatsShowcaseLeft>
						<div>graphic left</div>
						<div>
							desc
						</div>
					</ChatsShowcaseLeft>
				</div>
			</LandingPageWrapper>
		);
	}
}

export default LandingPage;
