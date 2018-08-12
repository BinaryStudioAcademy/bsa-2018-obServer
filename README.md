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

* ``` userAPI.loginUser(user) ```- login by 'user'

* ``` userAPI.logoutUser() ```- logout

* ``` userAPI.fetchUser(id) ```- get user by id

* ``` userAPI.updateUser(user) ```- update 'user' data by 'user.id'

* ``` userAPI.deleteUser(id) ```- delete user by id

## Backend description

### Back-end routes



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

![Schemes relations](https://drive.google.com/file/d/1Dt9NCCV1kFu_mufDfLzE1AC1MoigFLTi/view)

