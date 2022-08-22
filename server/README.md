# SERVER - Quick start

## Project structure

0. __index.ts:__ server entrypoint
1. __entitities:__ contains class/interface definition of the entities of the database
2. __routes:__ contains endpoints definitions and implementations.
3. __json:__ contains the class/interface definition of the various objects
exchanged via http requests.

In ```const.ts``` are stored all constants needed by the server. By default the
server will statically serve the folder indicated by the ```BACKOFFICE_DIR```
constant.

## Run the project

### Database

Install ```docker``` and  ```docker-compose``` then maybe you have to pull the docker image, so run:

```bash
docker pull mongo
```

then, to run the container do:

```bash
docker-compose up
```
and you should be ready to go.

__NOTE:__ The db will run on localhost:27017

__Il consiglio di Mattia:__ Per avere un migliore controllo sul db consiglio
di scaricare la versione gratuita di [mingo](https://mingo.io/)

### Server

Install ```nodejs``` and then the dependeces doing:

```bash
npm i 
```

from server root directory. Then to compile do:

```bash
tsc
```

and to run the server:

```bash
npm start
```

__NOTE:__ The server will run on [localhost:8080](http://localhost:8080)

__Il consiglio di Mattia:__ Ho installato anche nodemon che si occupa di startare
da solo node quando un file cambia.

```
nodemon out/index.js
```

Il mio consiglio pero' e' di compilare ed startare dando:

```
tsc && npm start
```

### Swagger (optional)

To run swagger pull and run the container with:

```bash
docker run -p 8081:8080 swaggerapi/swagger-editor
```
__NOTE:__ Swagger editor will run on [localhost:8081](http://localhost:8081)

__Il consiglio di Mattia:__ Consiglio fortemente di usare swagger per testare
gli endpoint quando non si ha ancora un frontend disponibile.

### exec script
In order to setup all things run the ```exec.sh``` script.
```bash
./exec.sh
```

__Il consiglio di Mattia:__ Se il tuo utente linux non appartiene al gruppo 
```docker``` e' probabile che siano richiesti i permessi di sudo.

Remember to stop the containers when finished.
```bash
docker-compose down
docker stop (nome-Container) 
docker stop 74140feae204
```
