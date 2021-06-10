const TaskTable = require('../External Interfaces/taskTable')
const UserTable = require('../External Interfaces/userTable')
const SessionTable = require('../External Interfaces/sessionTable')
const CustomerTable = require('../External Interfaces/customerTable')
const errorView = require('../View/errorView')

module.exports = app => {
    // Get all sessions
    app.get('/api/session/', (req, res) => {
        SessionTable.getAll(response => {
            res.json(response)
        })
    })

    // Get Sessions By UserId
    app.get('/api/session/:userId', function (req, res) {
        SessionTable.getByUserID(req.params.userId, session_response => {
            res.json(session_response);
        })
    });

    // Add New Session
    app.post('/api/session/add/', (req, res) => {
        const newSession = req.body
        SessionTable.addSession(newSession.Start, newSession.End, newSession.UserID);
        res.send('Sessão adicionada com sucesso \n')
    });

    // Get Available Sessions By UserId
    app.get('/api/session/available/:userId', function (req, res) {
        SessionTable.getAvailableSessionsByUserId(req.params.userId, session_response => {
            console.log(req.params.userId)
            res.json(session_response);
        })
    });
    




}