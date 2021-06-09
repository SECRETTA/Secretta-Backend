const TaskTable = require('../External Interfaces/taskTable')
const UserTable = require('../External Interfaces/userTable')
const CustomerTable = require('../External Interfaces/customerTable')
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
        TaskTable.addTask(newTask.Name, newTask.Place, newTask.CustomerID, newTask.Start, newTask.UserID)
        res.send('Tarefa adicionada com sucesso \n')
    });

    // Get tasks by user id and return formatted json
    app.get('/api/task/userid/:userID', function (req, res){
        var resDict = {};
        resDict['userID'] = req.params.userID;
        resDict['tasks'] = [];

        TaskTable.getByUserID(req.params.userID, results => {
            if (results === null) {
                // User not found
                view = new errorView(500)
                view.message(`Task for user '${req.params.userID}' not found.`)
                res.status(500).send(view.html())
            }
            else {
                /*Find Interval by UserID */
                UserTable.getUserByID(req.params.userID, userResults => {
                    if(userResults === null){
                        view = new errorView(500)
                        view.message(`User '${req.params.userID}' not found.`)
                        res.status(500).send(view.html())
                    }
                    else{
                        userResults = userResults[0];
                        var endTime;
                        for (let i = 0; i < results.length; i++) {
                            /*Find Customer Name by CustomerID*/
                            CustomerTable.getByCustomerID(results[i].CustomerID, customerResults => {
                                customerResults = customerResults[0];
                                if(customerResults === null){
                                    view = new errorView(500)
                                    view.message(`Customer '${results.CustomerID}' not found.`)
                                    res.status(500).send(view.html())

                                }
                                else{
                                    endTime = new Date((new Date (results[i].Start)).getTime() + userResults.TaskInterval*60000);
                                    console.log("Endtime antes da mudanca")
                                    console.log(endTime)
                                    endTime = endTime.toISOString().slice(0, 19).replace('T', ' ');
                                    console.log("Endtime depois da mudanca")
                                    console.log(endTime)
                                    resDict['tasks'].push({'start': results[i].Start, 'end': endTime,
                                    'customerName':customerResults.Name , 'customerID':results[i].CustomerID});
                                    console.log(resDict);
                                    if (i+1 == results.length){ res.json(resDict); } // Don't touch it's art
                                }
                            }) // From this point on, resDict has no longer values
                        }
                    }
                    
                })
            }       
        })
    });
}