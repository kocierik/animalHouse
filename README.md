# Animal House

## Installing

To install all the needed packages do

```sh
npm i
cd front-office
npm i
cd ../game
npm i
```

## Starting

### Database

To start the db container run

```sh
npm run db
```

To stop it run

```sh
npm run db:down
```

_Note:_ you will find an handy mongo-express GUI at `http://localhost:8081`.

### API and Backoffice 

To _compile_  and _start_ the server run

```sh
npm run server
```

it will start the server for the apis and the backoffice. 

### Front-office

To run the front-office React project _in dev mode_ simply run

```sh
npm run front
```

### Game

To run the game vue project _in dev mode_ simply run

```sh
npm run game
```

### All

To run all the projects _in dev mode_ rum

```sh
npm run all
```

## Build and production mode

To build all the sub-projects run
```sh
npm run build
```

and to start then in production mode run
```sh
npm run start
```

## Other

To format all the sub-projects run
```sh
npm run format
```













