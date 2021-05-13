const Table = require('./table');

class EmailTable extends Table {

    static addEmail(Email, Timestamp) {
        // DOC ME PLEASE!
        const sql = "INSERT INTO Email (Email, Timestamp) VALUES (?)"
        this.db().query(sql, [Email, Timestamp], (err, results) => {
            if (err)
                console.log("ERROR @ EmailTable.addEmail\n", err);
            else
                console.log("RESULTS @ EmailTable.addEmail\n", results);
        })
    }

    static getAll(callback) {
        // DOC ME PLEASE!
        const sql = 'SELECT * FROM Emails'
        this.db().query(sql, (err, results) => {
            if (err)
                console.log("ERROR @ EmailTable.addEmail\n", err);
            else
                callback(results);
        })
    }

    static getByUserID(UserID, callback) {
        // DOC ME PLEASE!
        const sql_query = 'SELECT * FROM Tasks WHERE UserID = ?'
        this.db().query(sql_query, [UserID], (err, results) => {
            if (err)
                console.log("ERROR @ EmailTable.getByUserId\n", err);
            else {
                if (results.length > 0) {
                    callback(results)
                } else {
                    callback(null)
                }
            }
        })
    }

    static updateById(Email, Id) {
        // Update an Email row through a given UserId
        const sql = 'UPDATE Emails SET Email = ? WHERE UserID = ?;'
        this.db().query(sql, [Email, Id], (err, results) => {
            if (err) {
                console.log("ERROR @ EmailTable.updateById\n", err);
            }
            else {
                console.log("RESULTS @ EmailTable.updateById\n", err);
            }
        })
    }


    static deleteById(Id){
        const sql = 'DELETE FROM Emails WHERE UserID = ?;'
        this.db().query(sql, [Id], (err, results) => {
            if (err) {
                console.log("ERROR @ EmailTable.deleteById\n", err);
            }
            else {
                console.log("RESULTS @ EmailTable.deleteById\n", err);
            }
        })
    }

    static deleteByEmail(Email){
        const sql = 'DELETE FROM Emails WHERE Email = ?;'
        this.db().query(sql, [Email], (err, results) => {
            if (err) {
                console.log("ERROR @ EmailTable.deleteById\n", err);
            }
            else {
                console.log("RESULTS @ EmailTable.deleteById\n", err);
            }
        })
    }
}

export {
    EmailTable
}

// module.exports = EmailTable