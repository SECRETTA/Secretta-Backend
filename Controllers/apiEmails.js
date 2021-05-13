import { EmailTable } from '../External Interfaces/EmailTable'
import { ValidateEmail } from '../UseCases/validateUser'
const UserTable = require('../External Interfaces/userTable')
const errorView = require('../View/errorView')

module.exports = app => {
    // Get all users
    app.get('/api/email/', (req, res) => {
        EmailTable.getAll(response => {
            res.json(response)
        })
    })

    // Add Email
    app.post ('/api/email/', (req, resp) =>{
        const newMail = req.body;
        EmailTable.addEmail(newMail.Email, newMail.Timestamp);
        res.send ('Email adicionado com sucesso.\n');

    })

    //Updating Email with json Email object
    app.post('/api/email/update', (req, res) => {
        let Validator = new ValidateEmail();
        const updateUser = req.body

        if (Validator.ValidateAll(updateUser)){
            EmailTable.updateById(updateUser.Email, updateUser.Id);
            res.send ('Email alterado com sucesso.\n');
        }
        res.send('Dados de email inválidos.\n');
        
    })


    // app.post('/api/email/delete/')
}