const TaskTable = require('../External Interfaces/taskTable')
const UserTable = require('../External Interfaces/userTable')
const errorView = require('../View/errorView')

module.exports = app => {
    // Get all users
    app.get('/api/task/', (req, res) => {
        TaskTable.getAll(response => {
            res.json(response)
        })
    })

    // Get user
    app.get('/api/task/:userName', function (req, res) {
        UserTable.getUserIdByUsername(req.params.userName, user_id => {
            if (user_id === null) {
                // User not found
                view = new errorView(500)
                view.message(`User '${req.params.userName}' not found.`)
                res.status(500).send(view.html())
            }
            else {
                TaskTable.getByUserID(user_id, task_response => {
                    res.json(task_response);
                })
            }
        })
    });

    // Add task
    app.post('/api/task/add/', (req, res) => {
        const newTask = req.body
        TaskTable.AddTask(newTask.Name, newTask.Place, newTask.Customer, newTask.Timestamp)
        res.send('Tarefa adicionada com sucesso \n')
    })
}