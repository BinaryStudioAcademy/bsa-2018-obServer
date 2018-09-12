# obServer
----
obServer - service for monitoring your Node.js app.
### Installation

```sh
$ npm install observer-bsa
```
### Usage
You need to create logcollect app on your server, that contains only index.js:
```js
require("observer-bsa/logcollect")(logcollectPort, companyId);
// logcollectPort - port on which your logcollect server will start
// companyId - company id from obServer account settings
```
Adding observer-bsa as dependency into your project:
```js
const observer = require('observer-bsa')(logcollectPort, appId);
// logcollectPort - port on which logcollect is started
// appid - app id from obServer account settings
```
### License
ISC
