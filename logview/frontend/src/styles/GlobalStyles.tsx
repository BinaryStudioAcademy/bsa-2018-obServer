import { injectGlobal } from 'styled-components';
const background = require('src/assets/login-background.jpg');

// tslint:disable-next-line:no-unused-expression
injectGlobal`
    html {
        height: 100%;
        width: 100%;
    }

    body {
        margin: 0;
        background-color: rgba(255,255,255,0.8);
        color: #3d3d3d;
    }
`;
