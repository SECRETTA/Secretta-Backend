const DataBase = require('./database');

class TableInit {
    // DOC ME PLEASE!

    static db() {
        return (new DataBase).pool;
    }

    static async run(callback) {
        // populate_tables = this.populateTables();

        console.log('iniciou ---------- ')
        await this.deleteTables();
        console.log('deletou aqui')
        await this.createTables();
        await this.populateTables();
    }

    static  deleteTables() {
        // DOC ME PLEASE!
        const sql_query= `DROP TABLE IF EXISTS Tasks;
                          DROP TABLE IF EXISTS Users;
                          DROP TABLE IF EXISTS Session;
                          DROP TABLE IF EXISTS Schedules;
                          DROP TABLE IF EXISTS Customers;
                          DROP TABLE IF EXISTS Tasks;
                          DROP TABLE IF EXISTS Chats;
                          DROP TABLE IF EXISTS Emails;`

        return new Promise((resolve, reject) => {
            this.db().query(sql_query, err => {
                if (err)
                    reject(`    [ERRO] ${err}`);
                else {
                    console.log("    [ OK ] Tabelas deletadas.")
                    resolve();
                }
            })
        });
    }

    static createTables(callback) {
        // DOC ME PLEASE!
        const sql_query = `\
        CREATE TABLE IF NOT EXISTS Users(
            Name varchar(30),
            Phone varchar(11),
            Email varchar(30),
            Username varchar(12),
            Bio varchar(100),
            TaskInterval int,
            UserID int NOT NULL AUTO_INCREMENT,
            PRIMARY KEY (UserID)
        );
        CREATE TABLE IF NOT EXISTS Session(
            SessionID int,
            Recurrent bool,
            Start Datetime,
            End Datetime,
            PRIMARY KEY (SessionID)
        );
        CREATE TABLE IF NOT EXISTS Schedules(
            ScheduleID int NOT NULL AUTO_INCREMENT,
            SessionID int,
            UserID int,
            PRIMARY KEY (ScheduleID),
            FOREIGN KEY (SessionID) REFERENCES Session (SessionID),
            FOREIGN KEY (UserID) REFERENCES Users (UserID)
        );
        CREATE TABLE IF NOT EXISTS Customers (
            CustomerID int NOT NULL AUTO_INCREMENT,
            Name varchar(30),
            Phone varchar(11),
            Email varchar(30),
            PRIMARY KEY (CustomerID)
        );
        CREATE TABLE IF NOT EXISTS Tasks(
            Name varchar(30) NOT NULL, --title
            Place varchar(30) NOT NULL, --aumentar tamanho
            CustomerID varchar(30) NOT NULL,
            Start Datetime NOT NULL,
            ServiceID int NOT NULL AUTO_INCREMENT,
            UserID int NOT NULL,
            PRIMARY KEY (ServiceID),
            FOREIGN KEY (UserID) REFERENCES Users (UserID),
            FOREIGN KEY (CustomerID) REFERENCES Customers (CustomerID)
        );
        CREATE TABLE IF NOT EXISTS Chats(
            TelegramUserID int NOT NULL,
            UserID int NOT NULL,
            CustomerID int NOT NULL,
            PRIMARY KEY (TelegramUserID),
            FOREIGN KEY (UserID) REFERENCES Users (UserID),
            FOREIGN KEY (CustomerID) REFERENCES Customers (CustomerID),
        );
        CREATE TABLE IF NOT EXISTS Emails(
            UserID int NOT NULL AUTO_INCREMENT,
            Email varchar(30) NOT NULL,
            Timestamp Datetime NOT NULL,
            PRIMARY KEY (UserID)
        );`

        return new Promise((resolve, reject) => {
            this.db().query(sql_query, err => {
                if (err)
                    reject(`    [ERRO] ${err}`);
                else {
                    console.log("    [ OK ] Tabelas criadas.")
                    resolve();
                }
            })
        });
    }

    static populateTables(callback) {
        // DOC ME PLEASE!
        const sql_query = `
        INSERT INTO Users (
            Name,
            Phone,
            Email,
            Username,
            Bio
        ) VALUES (
            'Joao Pedro Brandao',
            '21988888888',
            'jp.brs@poli.ufrj.br',
            'jpbrs',
            'Aluno de ECI. 100 reais a hora de programação'
            ), (
            'Pedro Maciel Xavier',
            '24999999999',
            'pedromxavier@poli.ufrj.br',
            'pedromxavier',
            'Um menino sonhador'
        );
        INSERT INTO Tasks (
            Name,
            Place,
            Customer,
            Timestamp,
            UserID
        ) VALUES (
            'Limpar o laboratorio',
            'UFRJ',
            'Felipe',
            '2021-04-18 22:22:22',
            2
            ), (
            'Tomar vergonha na cara',
            'Petropolis',
            'Pedro',
            '2021-04-18 22:20:22',
            2
            ), (
            'Criar os Endpoints de PA',
            'Rio de Janeiro',
            'Grupo de PA',
            '2021-04-19 00:00:00',
            1
        );
        INSERT INTO Emails (
            Email,
            Timestamp
        ) VALUES (
        'luizgiserman@poli.ufrj.br',
        '2021-04-19 00:00:00'
        );`

        return new Promise((resolve, reject) => {
            this.db().query(sql_query, err => {
                if (err)
                    reject(err);
                else {
                    console.log("    [ OK ] Tabelas populadas.")
                    resolve();
                }
            })
        });
    }
}

module.exports = TableInit;