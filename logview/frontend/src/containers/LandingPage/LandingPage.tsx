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
	LandingInfo,
	InfoBlock,
	InfoDescription
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
					<Particles params={config} width="100%" height="100vh" />
					<LandingMain>
						<Title>
							<ObserverIcon size="60" color="#3d3d3d" />
							obServer
						</Title>
						<Slogan>You produce. We track.</Slogan>
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
				
				<Title>What we do?</Title>
				<LandingInfo>
					<InfoBlock>
						<div>
							<img src={cpuChart} width="500px" />
						</div>
						<InfoDescription>
							<Title>

							</Title>
							We track CPU, memory of your app and display it in user-friendly UI.
						</InfoDescription>
					</InfoBlock>
					<InfoBlock>
						<InfoDescription>
							We track different HTTP requests stats, such as quantity of requests, routes and others.
						</InfoDescription>
						<div>
							<img src={cpuChart} width="500px" />
						</div>
					</InfoBlock>
					<InfoBlock>
						<div>
							<img src={cpuChart} width="500px" />
						</div>
						<InfoDescription>
							We show you different errors throughout the development of your app with handy history.
						</InfoDescription>
					</InfoBlock>
				</LandingInfo>
			</LandingPageWrapper>
		);
	}
}

export default LandingPage;
