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
	LandingCharts,
	ChatsShowcase
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
				
				<h2>What we do?</h2>
				<LandingCharts>
					<ChatsShowcase>
						<div>
							<img src={cpuChart} width="500px" />
						</div>
						<div>
							We track CPU, memory of your app and display it in user-friendly UI.
						</div>
					</ChatsShowcase>
					<ChatsShowcase>
						<div>
							We track different HTTP requests stats, such as quantity of requests, routes and others.
						</div>
						<div>
							<img src={cpuChart} width="500px" />
						</div>
					</ChatsShowcase>
					<ChatsShowcase>
						<div>
							<img src={cpuChart} width="500px" />
						</div>
						<div>
							We show you different errors throughout the development of your app with handy history.
						</div>
					</ChatsShowcase>
				</LandingCharts>
			</LandingPageWrapper>
		);
	}
}

export default LandingPage;
