const Table = require('./table');

class ChatTable extends Table {

    static newChat(TelegramUserID, UserID, ) {

    }

    static getChat(CustomerID, UserID) {
        const sql = "SELECT * FROM Chats WHERE CustomerID = ? AND UserID = ?"
        this.db().query(sql, [CustomerID, UserID], (err, results) => {
            if (err)
                console.log("ERROR @ ChatTable.getChat\n", err);
            else
                console.log("RESULTS @ ChatTable.getChat\n", results);
        })
    }

}

module.exports = ChatTable;