import * as React from 'react';
import { Background, Title, Slogan, LandingNav, NavItem, Button, ObserverIcon} from './LandingPageStyles';
import Particles from 'react-particles-js';
import config from './particlesjs-config';
import { Link } from 'react-router-dom';

class LandingPage extends React.Component {
    render() {
        return (
            <div>
                <Background>
                    <Particles
						params={config}
						width='100vw'
						height='99vh'
                    />
                </Background>
				<Title><ObserverIcon size="20" color="#3d3d3d"/>obServer</Title>
				<Slogan>You code. We track.</Slogan>
				<LandingNav>
					<NavItem>
					</NavItem>
					<NavItem>
						<Button primary><Link to="/login">sign in</Link></Button>
						<Button><Link to="/register">sign up</Link></Button>
					</NavItem>
				</LandingNav>
            </div>
        )
    }
}

export default LandingPage;