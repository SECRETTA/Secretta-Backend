const { response } = require('express');
const Table = require('./table');

class UserTable extends Table {
    // Class created with the only purpose off manipulate User Table methods via HTTP requests
    constructor() {
        super();
    }
    
    addUser(Name, Phone, Email, Username, Bio) {
        // Add new user to the User Table
        const sql = "INSERT INTO Users (Name,Phone,Email,Username,Bio) VALUES (?,?,?,?,?);"
        this.db.query(sql, [Name, Phone, Email, Username, Bio], (err, results) => {
            if (err)
                console.log("ERROR @ UserTable.addUser\n", err);
            else
                console.log("RESULTS @ UserTable.addUser\n", results);
        })
    }

    getUserIdByUsername(parameter, callback) {
        // Return UserId as result of a given username
        const sql = 'SELECT UserID FROM Users WHERE Username = ?;';
        this.db.query(sql, parameter, (err, resultados) => {
            if (err) {
                console.log("ERROR @ UserTable.getUserIdByUsername\n", err);
            }
            else {
                callback(resultados[0].UserID);
            }
        })
    }

    getAll(callback) {
        // Return all Users from User Table
        const sql = 'SELECT * FROM Users';
        this.db.query(sql, (err, results) => {
            if (err)
                console.log("ERROR @ UserTable.getAll\n", err);
            else
                callback(results);
        })
    }

    getByUsername(parameter, callback) {
        // Return a Row from User table as result of a given Username
        const sql = 'SELECT * FROM Users WHERE Username = ?;';
        this.db.query(sql, parameter, (err, results) => {
            if (err)
                console.log("ERROR @ UserTable.getByUsername\n", err);
            else
                callback(results);
        })
    }

    updateById(Name, Phone, Email, Username, Bio, Id) {
        // Update a User row through a given UserId
        const sql = 'UPDATE Users SET Name = ?, Phone = ?, Email = ?, Username = ?, Bio = ? WHERE UserID = ?;'
        this.db.query(sql, [Name, Phone, Email, Username, Bio, Id], (err, results) => {
            if(err){
                console.log("ERROR @ UserTable.updateById\n", err);
            }
            else {
                console.log("RESULTS @ UserTable.updateById\n", err);
            }
        })
    }

    deleteUserByJson(Name, Phone, Email, Username, Bio, Id) {
        // Delete a User row 
        const sql = 'DELETE FROM Users WHERE Name = ? AND Phone = ? AND Email = ? AND Username = ? AND Bio = ? AND UserID = ?;'
        this.db.query(sql, [Name, Phone, Email, Username, Bio, Id], (err, results) => {
            if(err){
                console.log("ERROR @ UserTable.deleteByJson\n", err);
            }
            else {
                console.log("RESULTS @ UserTable.deleteByJson\n", err);            }
        })
    }

}

module.exports = UserTable