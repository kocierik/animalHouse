# SERVER - Quick start

## Project structure

0. **index.ts:** server entrypoint
1. **entitities:** contains class/interface definition of the entities of the database
2. **routes:** contains endpoints definitions and implementations.
3. **json:** contains the class/interface definition of the various objects
   exchanged via http requests.

## Run the project

Install `docker` and `docker-compose`, then run:

```bash
docker-compose up
```

and you should be ready to go.

**NOTE:** The db will run on localhost:27017

**NOTE:** Swagger editor will run on [localhost:8081](http://localhost:8081)

**Il consiglio di Mattia:** Per avere un migliore controllo sul db consiglio
di scaricare la versione gratuita di [mingo](https://mingo.io/)

**Il consiglio di Mattia:** Consiglio fortemente di usare swagger per testare
gli endpoint quando non si ha ancora un frontend disponibile.

Remember to stop the containers when finished.

```bash
docker-compose down
```

### Server

Install `nodejs` and then the dependeces doing from server root directory:

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

**NOTE:** The server will run on [localhost:8080](http://localhost:8080)
