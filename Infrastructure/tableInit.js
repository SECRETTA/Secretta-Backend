const DataBase = require('./database');

class TableInit {
    // DOC ME PLEASE!

    static db() {
        return (new DataBase).pool;
    }

    static createTables(callback) {
        // DOC ME PLEASE!
        const user_sql = "\
        CREATE TABLE IF NOT EXISTS Users(\
            Name varchar(30),\
            Phone varchar(11),\
            Email varchar(30),\
            Username varchar(12),\
            Bio varchar(100),\
            UserID int NOT NULL AUTO_INCREMENT,\
            PRIMARY KEY (UserID)\
            );"

        const task_sql = "\
        CREATE TABLE IF NOT EXISTS Tasks(\
            Name varchar(30) NOT NULL,\
            Place varchar(30) NOT NULL,\
            Customer varchar(30) NOT NULL,\
            Timestamp Datetime NOT NULL,\
            ServiceID int NOT NULL AUTO_INCREMENT,\
            PRIMARY KEY (ServiceID),\
            UserID int NOT NULL,\
            FOREIGN KEY (UserID) REFERENCES Users (UserID)\
            );"

        this.db().query(user_sql, err => {
            if (err) {
                console.log(err);
                callback("Erro ao criar tabela de usuários.");
                return;
            }
            else
                console.log("Criação da tabela de usuários bem sucedida.");
        })

        this.db().query(task_sql, err => {
            if (err) {
                console.log(err);
                callback("Erro ao criar tabela de tarefas.");
            }
            else
                console.log("Criação da tabela de tarefas bem sucedida.");
        })
    }

    static populateDatabase(callback) {
        // DOC ME PLEASE!
        const user_sql = "\
        INSERT INTO Users (\
            Name,\
            Phone,\
            Email,\
            Username,\
            Bio\
        ) VALUES (\
            'Joao Pedro Brandao',\
            '21988888888',\
            'jp.brs@poli.ufrj.br',\
            'jpbrs',\
            'Aluno de ECI. 100 reais a hora de programação'\
            ), (\
            'Pedro Maciel Xavier',\
            '24999999999',\
            'pedromxavier@poli.ufrj.br',\
            'pedromxavier',\
            'Um menino sonhador'\
        );"

        const task_sql = "\
        INSERT INTO Tasks (\
            Name,\
            Place,\
            Customer,\
            Timestamp,\
            UserID\
        ) VALUES (\
            'Limpar o laboratorio',\
            'UFRJ',\
            'Felipe',\
            '2021-04-18 22:22:22',\
            2\
            ), (\
            'Tomar vergonha na cara',\
            'Petropolis',\
            'Pedro',\
            '2021-04-18 22:20:22',\
            2\
            ), (\
            'Criar os Endpoints de PA',\
            'Rio de Janeiro',\
            'Grupo de PA',\
            '2021-04-19 00:00:00',\
            1\
        );"

        this.db().query(user_sql, err => {
            if (err) {
                console.log(err);
                callback("Erro ao popular tabela de usuários.");
            } else {
                console.log("Tabela de usuários populada com sucesso.");
            }
        })

        this.db().query(task_sql, err => {
            if (err) {
                console.log(err);
                callback("Erro ao popular tabela de tarefas.");
            } else {
                console.log("Tabela de tarefas populada com sucesso.");
            }
        })
    }
}

module.exports = TableInit;