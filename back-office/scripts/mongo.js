let dbname = "animal-house-db";

const {MongoClient} = require("mongodb");
const fs = require("fs").promises;
const template = require(global.rootDir + "/scripts/template.js");


exports.search = async function(credentials, query){
    const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}/${credentials.dbname}`;
    try{
        const mongo = new MongoClient(mongouri);
        let result=[];
        await mongo.connect();
        await mongo.db(dbname)
                    .collection("products")
                    .find(query)
                    .forEach((r)=>result.push(r));
        await mongo.close();
        return result;
    }catch(e){
        console.log(e);
        return e;
    }
}

exports.isConnected = async function(credentials){
    const mongouri = `mongodb://${credentials.user}:${credentials.pwd}@${credentials.site}/${credentials.dbname}`;
    let client = await MongoClient.connect(mongouri);
    return client.topology.isConnected();
}