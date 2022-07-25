const mongoDB = require('mongoose'); 

const programmerCadastrados = mongoDB.model('programmers', {
    name: String, 
    email: String, 
    selectLanguage: String
})

module.exports = programmerCadastrados;