const { response } = require('express');
const Table = require('./table');

class UserTable extends Table {
    // DOC ME PLEASE!
    constructor() {
        super();
    }
    
    addUser(Name, Phone, Email, Username, Bio) {
        // DOC ME PLEASE!
        const sql = "INSERT INTO Users (Name,Phone,Email,Username,Bio) VALUES (?,?,?,?,?);"
        this.db.query(sql, [Name, Phone, Email, Username, Bio], (err, results) => {
            if (err)
                console.log("ERROR @ UserTable.addUser\n", err);
            else
                console.log("RESULTS @ UserTable.addUser\n", results);
        })
    }

    getUserIdByUsername(parameter, callback) {
        // DOC ME PLEASE!
        const sql = 'SELECT UserID FROM Users WHERE Username = ?;';
        this.db.query(sql, parameter, (err, resultados) => {
            if (err)
                console.log("ERROR @ UserTable.getUserIdByUsername\n", err);
            else
                callback(resultados[0]);
        })
    }

    getAll(callback) {
        // DOC ME PLEASE!
        const sql = 'SELECT * FROM Users';
        this.db.query(sql, (err, results) => {
            if (err)
                console.log("ERROR @ UserTable.getAll\n", err);
            else
                callback(results);
        })
    }

    getByUsername(parameter, callback) {
        // DOC ME PLEASE!
        const sql = 'SELECT * FROM Users WHERE Username = ?;';
        this.db.query(sql, parameter, (err, results) => {
            if (err)
                console.log("ERROR @ UserTable.getByUsername\n", err);
            else
                callback(results);
        })
    }
}

module.exports = UserTable