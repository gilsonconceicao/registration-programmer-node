const express = require('express');
const bodyParser = require('body-parser'); 
const mongodb = require('mongoose');
const port = 3000;

const app = express();

// body parser
app.use(bodyParser.urlencoded()); 

// use app recurse  
app.use(express.static(__dirname + '/public'));

// create database
const programmersForm = require('./models/cadastroMongoDB'); 

// rotas
app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})


// enviar dados post

app.post('/cadastroProgrammer', async (req, res) => {
    const {name, email, selectLanguage} = req.body; 

    const programmerCadastrado = {
        name, 
        email,
        selectLanguage
    }

    try {
        await programmersForm.create(programmerCadastrado); 
        res.status(201).sendFile(__dirname + '/public/assets/pageAssets.html'); 
    } catch (error) {
        res.status(503).send('error')
    }
})

// connect mongodb
const uri = 'mongodb+srv://GilsonConceicao:{passwoerd}@cluster0.gnlyf.mongodb.net/{nameofbank}?retryWrites=true&w=majority'

mongodb.connect(uri)
    .then(
        app.listen(port, () => {
            console.log('Servidor ativo e mongoDB funcionando!!!');
        })
    ).catch(error => console.log(error))
