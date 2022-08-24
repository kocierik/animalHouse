# SERVER - Quick start

## Project structure

0. __index.ts:__ server entrypoint
1. __entitities:__ contains class/interface definition of the entities of the database
2. __routes:__ contains endpoints definitions and implementations.
3. __json:__ contains the class/interface definition of the various objects
exchanged via http requests.

## Run the project

Install ```docker``` and  ```docker-compose```, then run:

```bash
docker-compose up
```
and you should be ready to go.

__NOTE:__ The db will run on localhost:27017

__NOTE:__ Swagger editor will run on [localhost:8081](http://localhost:8081)

__Il consiglio di Mattia:__ Per avere un migliore controllo sul db consiglio
di scaricare la versione gratuita di [mingo](https://mingo.io/)

__Il consiglio di Mattia:__ Consiglio fortemente di usare swagger per testare
gli endpoint quando non si ha ancora un frontend disponibile.


Remember to stop the containers when finished.

```bash
docker-compose down
```
### Server

Install ```nodejs``` and then the dependeces doing from server root directory: 

```bash
npm i 
```

Then to compile do:

```bash
tsc
```

and to run the server:

```bash
npm start
```

__NOTE:__ The server will run on [localhost:8080](http://localhost:8080)
