const TaskTable = require('../External Interfaces/taskTable')
const UserTable = require('../External Interfaces/userTable')
const errorView = require('../View/errorView')

module.exports = app => {
    // Get all users
    app.get('/api/task', (req, res) => {
        TaskTable.getAll(response => {
            res.json(response)
        })
    })

    // Get user
    app.get('/api/task/:userName', function (req, res) {
        UserTable.getUserIdByUsername(req.params.userName, user_response => {
            if (user_response === undefined) {
                view = new errorView(500)
                res.status(500).send(view.html())
            }
            else {
                TaskTable.getByUsername(response.UserId, task_response => {
                    res.json(task_response);
                })
            }
        })
    });

    // Add user
    app.post('/api/task/add', (req, res) => {
        const newTask = req.body
        TaskTable.AddTask(newTask.Name, newTask.Place, newTask.Customer, newTask.Timestamp)
        res.send('Tarefa adicionada com sucesso \n')
    })

}