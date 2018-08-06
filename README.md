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

### User api frontend (GRUD)

```
import {userAPI} from '.[/frontend]/src/services'
```
userAPI.fetchUser(id) - get user by id
userAPI.addUser(user) - add 'user'
userAPI.updateUser(user) - update 'user' data
userAPI.fetchUser(id) - get user by id
