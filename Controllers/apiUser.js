const UserTable = require('../External Interfaces/userTable');
const ValidateUser = require('../UseCases/validateUser');
const errorView = require('../View/errorView')


module.exports = app => {
    
    // Returning all users
    app.get('/api/user', (req, res) => {
        UserTable.getAll(response => {
            res.json(response);
        })
    })

    // Get users by username
    app.get('/api/user/:userName', function(req, res) {
        UserTable.getByUsername(req.params.userName, response=> {
            res.json(response);
        })
    });

    
    // Get userId by username
    app.get('/api/user/id/:userName', function(req, res) {
        UserTable.getUserIdByUsername(req.params.userName, response=> {
            res.json(response);
        })
    });

    // Adding user
    app.post('/api/user/add', (req, res) => {
        let Validator = new ValidateUser();
        const newUser = req.body
        if(Validator.ValidateAll(newUser)){
            console.log(newUser)
            UserTable.addUser(
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
    });

    //Updating user with json user object
    app.post('/api/user/update', (req, res) => {
        let Validator = new ValidateUser();
        const updateUser = req.body
        UserTable.getUserIdByUsername(updateUser.Username, user_response => {
            if (user_response === undefined) {
                view = new errorView(500)
                view.message(`Usuário '${updateUser.Username}' não encontrado.`)
                res.status(500).send(view.html())
            }
            else {
                console.log(user_response)
                if(Validator.ValidateAll(updateUser)){
                    console.log(updateUser)
                    UserTable.updateById(
                        updateUser.Name,
                        updateUser.Phone,
                        updateUser.Email,
                        updateUser.Username,
                        updateUser.Bio,
                        user_response)
                        res.send('Dados atualizados com sucesso\n');
                } else { 
                    console.log("Dados de usuário inválidos.");
                    res.send('Dados de usuário inválidos.\n');
                }
            }
        })
    })

    //Delete user receiving an entire json
    app.post('/api/user/delete/', (req, res) => {
        let Validator = new ValidateUser();
        const deleteUser = req.body
        console.log(deleteUser)
        UserTable.getUserIdByUsername(deleteUser.Username, user_response => {
            if (user_response === undefined) {
                view = new errorView(500)
                res.status(500).send(view.html())
            }
            else {
                if(Validator.ValidateAll(deleteUser)){
                    console.log(deleteUser)
                    UserTable.deleteUserByJson(
                        deleteUser.Name,
                        deleteUser.Phone,
                        deleteUser.Email,
                        deleteUser.Username,
                        deleteUser.Bio,
                        user_response)
                        res.send('Usuário deletado com sucesso.\n');
                } else { 
                    console.log("Dados de usuário inválidos.");
                    res.send('Dados de usuário inválidos.\n');
                }
            }
        })
    });

    
}