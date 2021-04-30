const fs = require('fs');
const toml = require('toml');
const mysql = require('mysql2');

class DataBase {

    constructor(configPath = './Infrastructure/mysql.conf') {
        // Here we create a singleton for DataBase.
        // This means there will exist only one instance from this class.
        if (DataBase.__ref__ === undefined) {
            // Reference singleton instance.
            DataBase.__ref__ = this;
            // Initialize instance
            this.init(configPath);
        }
        return DataBase.__ref__;
    }

    toString() {
        return `MySQL rodando.
        host = ${this.config.host.host}
        user = ${this.config.host.user}
        port = ${this.config.host.port}`;
    }

    init(configPath) {
        // Retrieve config from TOML .conf file.
        this.config = toml.parse(fs.readFileSync(configPath, 'utf-8'));

        // Create connection pool to handle multiple requests simultaneously.
        this.pool = mysql.createPool({
            ...this.config.host,
            multipleStatements: true,
            waitForConnections: true,
            connectionLimit: 20,
            queueLimit: 0
          });
    }
}

module.exports = DataBase