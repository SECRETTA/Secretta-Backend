const Table = require('./table');

class CustomerTable extends Table {

    static getByCustomerID(CustomerID, callback) {
        // DOC ME PLEASE!
        const sql_query = 'SELECT * FROM Customers WHERE CustomerID = ?'
        this.db().query(sql_query, [CustomerID], (err, results) => {
            if (err){
                console.log("ERROR @ CustomerTable.getByCustomerID\n", err);
            }
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

module.exports = CustomerTable