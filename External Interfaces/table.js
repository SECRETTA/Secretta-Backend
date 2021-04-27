const DataBase = require("../Infrastructure/database");

class Table {
    constructor() {
        this.database = new DataBase();
        this.db = this.database.pool;
    }
}
module.exports = Table