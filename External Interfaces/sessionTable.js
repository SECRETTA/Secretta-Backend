const moment = require('moment');
const Table = require('./table');

class SessionTable extends Table {

    static addSession(Start, End, UserID) {
        // DOC ME PLEASE!
        const sql = "INSERT INTO Session (Start, End, UserId) VALUES (?,?,?)"
        this.db().query(sql, [Start, End, UserID], (err, results) => {
            if (err)
                console.log("ERROR @ SessionTable.addSession\n", err);
            else
                console.log("RESULTS @ SessionTable.addSession\n", results);
        })
    }

    static getAll(callback) {
        // DOC ME PLEASE!
        const sql = 'SELECT * FROM Session'
        this.db().query(sql, (err, results) => {
            console.log(results[0].Start);
            results.forEach(element => {
                element.Start = moment(element.Start).format("DD-MM-YY HH:mm:ss")
                element.End = moment(element.End).format("DD-MM-YY HH:mm:ss")
            });
            if (err)
                console.log("ERROR @ SessionTable.getAll\n", err);
            else
                callback(results);
        })
    }

    static getByUserID(UserID, callback) {
        // DOC ME PLEASE!
        const sql_query = 'SELECT * FROM Session WHERE UserID = ?'
        this.db().query(sql_query, [UserID], (err, results) => {
            results.forEach(element => {
                element.Start = moment(element.Start).format("DD-MM-YY HH:mm:ss")
                element.End = moment(element.End).format("DD-MM-YY HH:mm:ss")
            });
            if (err)
                console.log("ERROR @ SessionTable.getByUserID\n", err);
            else {
                if (results.length > 0) {
                    callback(results)
                } else {
                    callback(null)
                }
            }
        })
    }

    static getAvailableSessionsByUserId(UserID, callback) {
        const sql_query = `SELECT Session.SessionID,
                                    Session.Start,
                                    Session.UserID,
                                    Session.End
                            FROM Session
                            LEFT OUTER JOIN Tasks
                            ON Session.Start = Tasks.Start
                            WHERE Tasks.Start is NULL AND Session.UserID = ?;`

        this.db().query(sql_query, [UserID], (err, results) => {
            results.forEach(element => {
                element.Start = moment(element.Start).format("DD-MM-YY HH:mm:ss")
                element.End = moment(element.End).format("DD-MM-YY HH:mm:ss")
            });
            if (err)
                console.log("ERROR @ SessionTable.getAvailableSessionsByUserId\n", err);
            else {
                if (results.length > 0) {
                    callback(results)
                } else {
                    callback(null)
                }
            }
        })
    }
}

module.exports = SessionTable