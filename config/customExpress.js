const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const cors = require('cors');
module.exports = () => {
    const app = express()

    app.use(bodyParser.urlencoded({extended : true}));
    app.use(bodyParser.json(0));
    app.use(cors());


    consign().include('Controllers').into(app) // Adicionando os pacotes dentro de controllers ao express

    return app
}
