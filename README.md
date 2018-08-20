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

* ``` userAPI.resetPasswordEmail(email) ```- send reset password link with token to email

* ``` userAPI.changePassword(resetToken, newPassword) ```- change user password on 'newPassword' if token is valid

* ``` userAPI.activateUser(activationToken) ```- activate new user if 'activationToken' is valid

## Backend description

### Back-end routes

##### Registering a new user
```js
POST /api/user // route which allows for creation of additional user
```
| Method | Data received | Data sent | Description |
| ------- | ------- | ------- | ----------- |
| [`create`](https://github.com/BinaryStudioAcademy/bsa-2018-obServer/blob/dev/logview/backend/services/userService.js#L44-L61) _(userService)_ | `req.body`: `name`, `email`, `password`, `company` | new user entity in db | Validates input data and creates new user entity in the database |
| [`findByEmail`](https://github.com/BinaryStudioAcademy/bsa-2018-obServer/blob/dev/logview/backend/services/userService.js#L79-L81) | `req.body.email` | result of the search of users with the same email in db | Searches for user entity with the same email in the database |
| [`encryptPassword`](https://github.com/BinaryStudioAcademy/bsa-2018-obServer/blob/dev/logview/backend/services/userService.js#L12-L16) | number of `saltRounds` | hashed password | Hashes input password with `bcrypt` |
| [`generateUserToken`](https://github.com/BinaryStudioAcademy/bsa-2018-obServer/blob/dev/logview/backend/services/userService.js#L24-L32) | number of `randomBytes` | random n-bytes string | Generates user token with `crypto` |
| [`create`](https://github.com/BinaryStudioAcademy/bsa-2018-obServer/blob/dev/logview/backend/services/userService.js#L32-L39) _(companyService)_ | `req.body.company` | new company entity in db | When company name provided, validates this name and creates new company entity in the database |
| [`validateName`](https://github.com/BinaryStudioAcademy/bsa-2018-obServer/blob/dev/logview/backend/services/userService.js#L10-L20) | `req.body.company` | `true` or `false` | Validates provided company name |
| [`generateToken`](https://github.com/BinaryStudioAcademy/bsa-2018-obServer/blob/dev/logview/backend/services/userService.js#L24-L30) | number of `randomBytes` | random n-bytes string | Generates company token with `crypto` |
| `sendEmail` | `msg`, `userActivationToken` | sent email with token | Sends email with `sgMail` to confirm registration |
```js
POST /api/register // route which allows for creation of additional user
```
| Method | Data received | Data sent | Description |
| ------- | ------- | ------- | ----------- |
| [`create`](https://github.com/BinaryStudioAcademy/bsa-2018-obServer/blob/dev/logview/backend/services/userService.js#L44-L61) _(userService)_ | `req.body` | new user entity in db | Validates received data and creates new user entity in the database |
| [`findByEmail`](https://github.com/BinaryStudioAcademy/bsa-2018-obServer/blob/dev/logview/backend/services/userService.js#L79-L81) | `req.body.email` | result of the search of users with the same email in db | Searches for user entity with the same email in the database |
| [`encryptPassword`](https://github.com/BinaryStudioAcademy/bsa-2018-obServer/blob/dev/logview/backend/services/userService.js#L12-L16) | number of `saltRounds` | hashed password | Hashes input password with `bcrypt` |
| [`generateUserToken`](https://github.com/BinaryStudioAcademy/bsa-2018-obServer/blob/dev/logview/backend/services/userService.js#L24-L32) | number of `randomBytes` | random n-bytes string | Generates user token with `crypto` |
| [`create`](https://github.com/BinaryStudioAcademy/bsa-2018-obServer/blob/dev/logview/backend/services/userService.js#L32-L39) _(companyService)_ | `req.body.company` | new company entity in db | When company name provided, validates this name and creates new company entity in the database |
| [`validateName`](https://github.com/BinaryStudioAcademy/bsa-2018-obServer/blob/dev/logview/backend/services/userService.js#L10-L20) | `req.body.company` | `true` or `false` | Validates provided company name |
| [`generateToken`](https://github.com/BinaryStudioAcademy/bsa-2018-obServer/blob/dev/logview/backend/services/userService.js#L24-L30) | number of `randomBytes` | random n-bytes string | Generates company token with `crypto` |

##### User activation
```js
POST /api/user/activate/:activationToken // route which allows for user authentification
```
| Method | Data received | Data sent | Description |
| ------- | ------- | ------- | ----------- |
| `findByUserActivationToken` | `req.params.activationToken` | result of the search of users in db | Searches for user entity with the same `userActivationToken` in the database |
| `update` | `id`, `{ active: true }` | updated user entity in db | Provides user activation in the database |

##### Login & Logout
```js
POST /api/login // route which allows for user login
```
| Method | Data received | Data sent | Description |
| ------- | ------- | ------- | ----------- |
| `passport.authenticate` | `email`, `password` | user entity in db or err message | Checks received email and password for login with `passport` |
| `findByEmail` | `email` | result of the search of users with the same email in db | Searches for user entity with the same email in the database |
| `validPassword` | `password`, `user.password` | `true` or `false` | Compares hashed passwords with `bcrypt` |
```js
GET /api/logout // route which allows for user logout
```
| Method | Data received | Data sent | Description |
| ------- | ------- | ------- | ----------- |
| `passport.logout` | - | - | Provides logout with `passport` |

##### Password reset
```js
POST /api/user/resetpassword // route which resets password for the specified user
```
| Method | Data received | Data sent | Description |
| ------- | ------- | ------- | ----------- |
| `generateUserToken` | number of `randomBytes` | random n-bytes string | Generates user token with `crypto` |
| `findByEmail` | `req.body.email` | result of the search of users with the same email in db | Searches for user entity with the same email in the database |
| `update` | `id`, `{ resetPasswordToken, resetPasswordExpires }` | updated user entity in db | Updates that user entity with new resetPasswordToken and resetPasswordExpires date |
| `sendEmail` | `msg`, userData | sent email with reset password info | Sends email with `sgMail` |
```js
POST /api/user/changepassword/:resetToken // route which updates password for the specified user
```
| Method | Data received | Data sent | Description |
| ------- | ------- | ------- | ----------- |
| `findByResetPasswordToken` | `req.params.resetToken` | result of the search of users with the same resetPasswordToken in db | Searches for user entity with the same resetPasswordToken in the database |
| `encryptPassword` | number of `saltRounds` | hashed password | Hashes input password with `bcrypt` |
| `update` | `id`, `{resetPasswordToken, resetPasswordExpires, password}` | updated user entity in db | Updates that user entity with new hashed password and null resetPasswordToken and resetPasswordExpires properties |
| `sendEmail` | `msg`, userData | sent email with reset password report | Sends email with `sgMail` |

###### Notes
_These routes and methods are yet unnecessary and(or) unsecure:_
```js
GET /api/user // route which retrieves data about all users
```
| Method | Data received | Data sent | Description |
| ------- | ------- | ------- | ----------- |
| `findAll` | - | all user entities in db | Searches for all user entities in the database |
```js
GET /api/user/:id // route which retrieves data about specified user
```
| Method | Data received | Data sent | Description |
| ------- | ------- | ------- | ----------- |
| `findById` | `req.params.id` | user entity with same id in db | Searches for user entity with the same id in the database |
```js
POST /api/user/delete/:id // route which deletes specified user
```
| Method | Data received | Data sent | Description |
| ------- | ------- | ------- | ----------- |
| `delete` | `req.params.id` | - | Deletes for user entity with the same id in the database |
```js
PUT /api/user/:id // route which updates data about specified user
```
| Method | Data received | Data sent | Description |
| ------- | ------- | ------- | ----------- |
| `update` | `req.params.id`, `req.body` | updated user entity in db | Updates user entity with the same id in the database |

### Posgre tables schemes and relations

#### Model information

- Name: `Company`
  - Datasource: `db (memory)`
  - Base class: `PersistedModel`
  - Expose via REST: `No`
  - Custom plural form: *companys*
  - Properties
    - `id`
      - UUID
      - Required
      - PrimaryKey
    - `name`
      - String
      - Required
    - `token`
      - Number
      - Required
      - Unique
- Name: `User`
  - Datasource: `db (memory)`
  - Base class: `PersistedModel`
  - Expose via REST: `Yes`
  - Custom plural form: *users*
  - Properties
    - `id`
      - UUID
      - Required
      - PrimaryKey
    - `name`
      - String
      - Required
    - `email`
      - String
      - Required
      - Unique
    - `password`
      - String
      - Required
    - `active`
      - Boolean
    - `resetPasswordToken`
      - String
    - `resetPasswordExpires`
      - Date
    - `userActivationToken`
      - String
    - `companyId`
      - UUID
      - Required
      - ForeignKey

#### Model relation information

- `Company`
  - has many
      - `User`
        - Property name for the relation: `users`
        - Custom foreign key: `companyId`
        - Require a through model: No

- `User`
  - belongs to
    - `Company`
      - Property name for the relation: `company`
      - Custom foreign key: `companyId`
      - Require a through model: No

![Schemes relations](http://drive.google.com/uc?export=view&id=1Dt9NCCV1kFu_mufDfLzE1AC1MoigFLTi)


## LogConnect
#### Includes to client app. Reads app metrics. Sends app metrics/logs to LogCollect
### Usage
```js
// temporary
const obServer = require(./logconnect)(logcollectPort, { id: 'MyAppId', name: 'MyAppName' });
```
### HTTP Middleware (Express.js)
#### Usage
```js
app.use(obServer.httpStats());
```
#### Log data
* request route
* request method
* response time
* response status code
* request size
* response size


## Raw storage
#### Get log from Logcollect -> Save raw log to MongoDB -> Send raw log to Aggregated storage.
* Start server on port `process.env.RAWSTORAGE_PORT`
* Send log message to aggregatedStorage server on port `process.env.AGGREGATEDSTORAGE_PORT`
### Routes
```js
POST /api/logs // add new log (from logcollect)
```
### Raw log data model
```js
  logType: {
    type: String,
    required: true
  },
  data: mongoose.Schema.Types.Mixed,
  timestamp: {
    type: Date,
    required: true
  },
  companyToken: {
    type: String,
    required: true
  },
  app: {
    id: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: false
    }
  }
```


## Aggregated storage
#### Get log from Raw storage -> Save log to MongoDB based on companyId and/or appId -> Send logs to Logview backend via WebSockets
* Start server on port `process.env.AGGREGATEDSTORAGE_PORT`
* Send log message to aggregatedStorage server on port `process.env.AGGREGATEDSTORAGE_PORT`
### Routes
```js
POST /api/logs // add new log (from rawstorage)
```
### WebSockets
```js
// get logs for specified company (getLog request from logview backend)
socket.on('getLogs', (companyId, response) => {
  response(logsFromRecentDays);
}

// emit new log to logview backend
io.emit('newLog', logMessage);
```

### Log types data models
#### Company logs (main data model)
```js
companyId: {
  type: String,
  required: true
},
serverData: {
  cpuServer: [cpuServer],
  memoryServer: [memoryServer]
},
appsData: [{
  appId: String,
  appName: String,
  logs: { 
    cpuApp: [cpuApp],
    memoryApp: [memoryApp],
    httpStats: [httpStats],
    socketsStats: [socketsStats],
    errorLog: [errorLog]
  }
}]  
```
#### Server CPU (CPU_SERVER)
```js
cores: {
  type: [{
    coreName: {
      type: String,
      required: true
    },
    coreLoadPercentages: {
      type: Number,
      required: true
    }
  }],
  require: true
},
timestamp: {
  type: Date,
  required: true
}
```
#### Server memory (MEMORY_SERVER)
```js
freeMemory: {
  type: Number,
  required: true
},
allMemory: {
  type: Number,
  required: true
},
freeMemoryPercentage: {
  type: Number,
  required: true
},
timestamp: {
  type: Date,
  required: true
}
```
#### App CPU (CPU_APP)
```js
cpuUsagePercentages: {
  type: Number,
  required: true
},
timestamp: {
  type: Date,
  required: true
}
```
#### App memory (MEMORY_APP)
```js
memory: {
  heap: {
    type: Number,
    required: true
  },
  totalProcessMemory: {
    type: Number,
    required: true
  }
},
timestamp: {
  type: Date,
  required: true
}
```
#### HTTP stats from Express.js middleware (HTTP_STATS)
```js
requests: {
  frequency: {
    type: Number,
    required: true
  }
},
responseTime: {
  type: [{
    route: {
      type: String,
      required: true
    },
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    avg: {
      type: Number,
      required: true
    }
  }],
  required: true
},
timestamp: {
  type: Date,
  required: true
}
```
#### WebSockets stats (SOCKETS_STATS)
```js
rooms: [{
  roomName: {
    type: String,
    required: true
  },
  roomAmount: {
    type: Number,
    required: true
  }
}],
requests: {
  frequency: {
    type: Number,
    required: true
  }
},
responseTime: {
  min: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    required: true
  },
  avg: {
    type: Number,
    required: true
  }
},
timestamp: {
  type: Date,
  required: true
}
```
#### Error log message (ERROR_LOG)
```js
errorMessage: {
  type: String,
  required: true
},
timestamp: {
  type: Date,
  required: true
}
```
