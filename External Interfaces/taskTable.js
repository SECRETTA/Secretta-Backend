const Table = require('./table');

class TaskTable extends Table {

    static addTask(Name, Place, CustomerID, Start, UserID) {
        // DOC ME PLEASE!
        const sql = "INSERT INTO Tasks (Name, Place, CustomerID, Start, UserID) VALUES (?,?,?,?,?)"
        this.db().query(sql, [Name, Place, CustomerID, Start, UserID], (err, results) => {
            if (err)
                console.log("ERROR @ TaskTable.addTask\n", err);
            else
                console.log("RESULTS @ TaskTable.addTask\n", results);
        })
    }

    static addRecentTask(Name, Place, CustomerID, UserID) {
        for(var i = 1 ; i < 10; i++){
            var today = new Date();
            var Start = new Date();
            Start.setDate(today.getDate()+i);
            Start = Start.toISOString().slice(0,19).replace("T"," ");
            const sql = "INSERT INTO Tasks (Name, Place, CustomerID, Start, UserID) VALUES (?,?,?,?,?)"
            this.db().query(sql, [Name+String(i), Place, CustomerID, Start, UserID], (err, results) => {
                if (err)
                    console.log("ERROR @ TaskTable.addTask\n", err);
                else
                    console.log("RESULTS @ TaskTable.addTask\n", results);
            })
        }
        // DOC ME PLEASE!
    }

    static getAll(callback) {
        // DOC ME PLEASE!
        const sql = 'SELECT * FROM Tasks'
        this.db().query(sql, (err, results) => {
            if (err)
                console.log("ERROR @ TaskTable.getAll\n", err);
            else
                callback(results);
        })
    }

    static getByUserID(UserID, callback) {
        // DOC ME PLEASE!
        const sql_query = 'SELECT * FROM Tasks WHERE UserID = ?'
        this.db().query(sql_query, [UserID], (err, results) => {
            if (err)
                console.log("ERROR @ TaskTable.getByUserID\n", err);
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

module.exports = TaskTable