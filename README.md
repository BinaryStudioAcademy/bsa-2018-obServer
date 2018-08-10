# obServe

## Project setup

Clone repository:

```
git clone https://github.com/BinaryStudioAcademy/bsa-2018-obServer.git
cd bsa-2018-obServer
```

Inside you will find 3 folders:
* logcollect - data collector
* logconnect - data connector
* logview - web app

Open part of the app you are working on:
```
cd logview
```
And install packages:

```
yarn run install
```

### Launch web app

Run the following command to start backend+frontend in watch mode:

```
yarn run start
```

Or to launch just front-end in watch mode:

```
yarn run watch-front
```

To start storybook:

```
yarn run storybook
```

## Frontend description

### User api frontend (GRUD) /logview/frontend/src/services

```javascript
import {userAPI} from './[relative path]/services'
```
User API methods:


* ``` userAPI.registerUser(user) ```- register new 'user'

* ``` userAPI.loginUser(loginData) ```- login by 'loginData'

* ``` userAPI.logoutUser() ```- logout

* ``` userAPI.fetchUser(id) ```- get user by id

* ``` userAPI.updateUser(id, updatedData) ```- update user data by 'id'

* ``` userAPI.deleteUser(id) ```- delete user by id

* ``` userAPI.resetPasswordEmail(email) ```- send reset password link with token to email

* ``` userAPI.changePassword(resetToken, newPassword) ```- change user password on 'newPassword' if token is valid

* ``` userAPI.activateUser(activationToken) ```- activate new user if 'activationToken' is valid
