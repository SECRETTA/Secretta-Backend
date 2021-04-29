const DataBase = require("../Infrastructure/database");

class Table {
    static db() {
        return (new DataBase).pool
    }
}
module.exports = Table