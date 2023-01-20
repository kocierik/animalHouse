# Animal House

## Installing

To install all the needed packages do

```sh
npm i
yarn setup
```

## Starting

### Database

To start the db container run

```sh
yarn db
```

To stop it run

```sh
yarn db:down
```

_Note:_ you will find an handy mongo-express GUI at `http://localhost:8081`.

### API and Backoffice

To _compile_ and _start_ the server run

```sh
yarn server
```

it will start the server for the apis and the backoffice.

### frontoffice

To run the frontoffice React project _in dev mode_ simply run

```sh
yarn front
```

### Game

To run the game vue project _in dev mode_ simply run

```sh
yarn game
```

### All

To run all the projects _in dev mode_ rum

```sh
yarn all
```

## Build and production mode

To build all the sub-projects run

```sh
yarn build
```

and to start then in production mode run

```sh
yarn start
```

to build only a specific project run

```sh
yarn build:server
yarn build:front
yarn build:game
```

## Other

To format all the sub-projects run

```sh
yarn format
```
