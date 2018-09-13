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
	InfoDescription,
	InfoImage,
	TitleSmall,
	InfoTitle,
	InfoImageContainer,
	Footer,
	FooterTitle,
	FooterLinkText,
	FooterLink,
	GetStartedBar,
	GitHub
} from './LandingPageStyles';
import Particles from 'react-particles-js';
import config from './particlesjs-config';
import { Link } from 'react-router-dom';
const httpChart = require('src/assets/LandingChartMock.png');
const cpuChart = require('src/assets/LandingCpuChart.png');

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
						<InfoImageContainer>
							<InfoImage src={cpuChart} />
						</InfoImageContainer>
						<InfoDescription>
							<InfoTitle>
								The tracking of cpu
							</InfoTitle>
							We track CPU, memory of your app and display it in user-friendly UI.
						</InfoDescription>
					</InfoBlock>
					<InfoBlock>
						<InfoDescription>
							<InfoTitle>
								The tracking of Http
							</InfoTitle>
							We track different HTTP requests stats, such as quantity of requests, routes and others.
						</InfoDescription>
						<InfoImageContainer>
							<InfoImage src={httpChart} />
						</InfoImageContainer>
					</InfoBlock>
					<InfoBlock>
						<InfoImageContainer>
							<InfoImage src={cpuChart} />
						</InfoImageContainer>
						<InfoDescription>
							<InfoTitle>
								Errog/Bug tracing
							</InfoTitle>
							We show you different errors throughout the development of your app with handy history.
						</InfoDescription>
					</InfoBlock>
					<InfoBlock>
						<InfoDescription>
							<InfoTitle>
								Notify you when your app is down
							</InfoTitle>
							Be sure that you will always know when your server is down
						</InfoDescription>
						<InfoImageContainer>
							<InfoImage src={cpuChart} />
						</InfoImageContainer>
					</InfoBlock>
				</LandingInfo>

				<GetStartedBar>

				</GetStartedBar>
				
				<Footer>
					<FooterTitle>
						Binary Studio Academy 2018. obServer Project.
					</FooterTitle>
					<FooterLink>
						<GitHub size="20"/>
						<FooterLinkText>
							<a href="https://github.com/BinaryStudioAcademy/bsa-2018-obServer">GitHub</a>
						</FooterLinkText>
					</FooterLink>
				</Footer>
			</LandingPageWrapper>
		);
	}
}

export default LandingPage;
