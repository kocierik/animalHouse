/*  CONFIGURAZIONE DI BASE (come fatta dal prof) */

global.rootDir = __dirname;
global.startDate = null;

const template = require(global.rootDir + "/scripts/template.js");
const mongo = require(global.rootDir + "/scripts/mongo.js");
const express = require('express');
const cors = require('cors');

let app = express();
//PROBLEMA: non riesce a beccare queste configurazioni quando va a generare le pagine html dalla cartella templates
app.use('/css', express.static(global.rootdir + "/public/css"));    //ERRORE INDEX.HTML Refused to apply style from 'http://localhost:8000/css/style.css' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.
app.use('/js', express.static(global.rootdir + "/public/js"));
app.use('/img', express.static(global.rootdir + "/public/img"));
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.enable('trust proxy');

/*  PAGINE DISPONIBILI  */
app.get('/', async function(req,res){
    let sitename = req.hostname.split('.')[0];
    let connected = await mongo.isConnected(mongoCredentials);
    
    res.send(await template.generate('index.html',{
        host: req.hostname,
        site: sitename,
        connected: connected        //TODO: si blocca tutto il caricamento se il db non è disponibile, da valutare se ha senso tenerlo o meno
    }));
});

app.get('/test', async function(req,res){   //TODO: rimuoverla, è solo un test rapido ctrlc ctrlv
    let prova = "TESTO DI PROVA";
    res.send(`
        <!doctype html>
        <html>
            <body>
                <h1>${prova}</h1>
            </body>
        </html>`);
});

/*  MONGODB */
const mongoCredentials = {
    user: "AnimalHouse",
    pwd: "animal",
    site: "localhost:27017",
    dbname: "animal-house-db"
};
app.get('/db/showall', async function(req,res){
    //res.send(await mongo.showAllProducts(mongoCredentials));
    let query = {};
    let result = await mongo.search(mongoCredentials,query)
    
    res.send(await await template.generate("mongo.html",{
        result:result
    }));

});



/*  STARTUP */
app.listen(8000, function(){
    global.startDate = new Date();
    console.log(`App listening on port 8000 started at ${global.startDate.toLocaleString()}\nRemember to start MongoDB`);
});