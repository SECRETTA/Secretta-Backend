const Table = require('./table');

class TaskTable extends Table {

    static addTask(Name, Place, Customer, Timestamp) {
        // DOC ME PLEASE!
        const sql = "INSERT INTO Tasks (Name, Place, Customer, Timestamp, UserID) VALUES (?,?,?,?));"
        this.db().query(sql, [Name, Place, Customer, Timestamp], (err, results) => {
            if (err)
                console.log("ERROR @ TaskTable.addTask\n", err);
            else
                console.log("RESULTS @ TaskTable.addTask\n", results);
        })
    }

    static getAll(callback) {
        // DOC ME PLEASE!
        const sql = 'SELECT * FROM Tasks;'
        this.db().query(sql, (err, results) => {
            if (err)
                console.log("ERROR @ TaskTable.getAll\n", err);
            else
                callback(results);
        })
    }

    static getByUsername(parameter, callback) {
        // DOC ME PLEASE!
        const sql = 'SELECT * FROM Tasks WHERE UserID = ?;'
        this.db().query(sql, parameter, (err, results) => {
            if (err)
                console.log("ERROR @ TaskTable.getByUsername\n", err);
            else {
                if (resultados.length > 0) {
                    callback(results)
                } else {
                    callback([])
                }
            }
        })
    }
}

module.exports = TaskTable