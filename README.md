# BACK-OFFICE

### Project Setup

```sh
npm install
```

### Hot-Reload for Development

```sh
npm start
```
Also, remember to check that MongoDB is up and running

## TODO
 - fix /db/showall paging
 - add /db/addproduct and /db/search
 - maybe change names
 - swagger docs

## FIXES
  - fix on app.use('/...', express.static(global.rootDir + "/public/.../)); -> not working on html templates after handlebars generation
