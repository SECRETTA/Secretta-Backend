const TaskTable = require('../External Interfaces/taskTable')
const UserTable = require('../External Interfaces/userTable')
const SessionTable = require('../External Interfaces/sessionTable')
const CustomerTable = require('../External Interfaces/customerTable')
const errorView = require('../View/errorView')
const ValidateSession = require('../UseCases/validateSession');


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
        let Validator = new ValidateSession();
        const newSession = req.body
        console.log(newSession.Start.length)
        console.log(typeof newSession.Start)
        if(Validator.ValidateSession(newSession)){
            SessionTable.addSession(newSession.Start, newSession.End, newSession.UserID);
            res.send('Sessão adicionada com sucesso \n')
        } else { 
            console.log("Dados de Sessao inválidos.");
            res.send('Dados de Sessao inválidos.\n');
        }
    });

    // Get Available Sessions By UserId
    app.get('/api/session/available/:userId', function (req, res) {
        SessionTable.getAvailableSessionsByUserId(req.params.userId, session_response => {
            console.log(req.params.userId)
            res.json(session_response);
        })
    });
    
}