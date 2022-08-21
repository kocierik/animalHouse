const Handlebars = require("handlebars");
const fs = require('fs').promises;

const templateDir = global.rootDir + "/templates/";

exports.generate = async function(template,data){
    var doc = await fs.readFile(templateDir + template, 'utf8');
    let ready = Handlebars.compile(doc);
    let d = ready(data);
    return d;
}