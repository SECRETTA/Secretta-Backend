const UserTable = require('../External Interfaces/userTable');
const ValidateUser = require('../UseCases/validateUser');

module.exports = app => {
    
    // Returning all users
    app.get('/api/user', (req, res) => {
        (new UserTable).getAll(response => {
            res.json(response);
        })
    })

    // Get users by username
    app.get('/api/user/:userName', function(req, res) {
        let User = new UserTable();
        User.getByUsername(req.params.userName, response=> {
            res.json(response);
        })
    });

    
    // Get userId by username
    app.get('/api/user/id/:userName', function(req, res) {
        let User = new UserTable();
        User.getUserIdByUsername(req.params.userName, response=> {
            res.json(response);
        })
    });

    // Adding user
    app.post('/api/user/add', (req, res) => {
        let User = new UserTable();
        let Validator = new ValidateUser();
        const newUser = req.body
        if(Validator.ValidateAll(newUser)){
            console.log(newUser)
            User.addUser(
                newUser.Name,
                newUser.Phone,
                newUser.Email,
                newUser.Username,
                newUser.Bio
            )
            res.send('Usuário adicionado com sucesso \n');
        } else { 
            console.log("Dados de usuário inválidos.");
            res.send('Dados de usuário inválidos.\n');
        }
    })

    
}