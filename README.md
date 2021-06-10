# Secretta Backend

Backend and Middleware of Secretta Application 

## Requirements

- MySQL Database
- mysql.conf file with the following data:

[host]
\
port = <your_MySQL_port>
\
host = "localhost"
\
user = "<your_user>"
\
password = "<your_password>"
\
database = "<your_schema>"

## Initializing

`npm install` 
\
`npm start` 

## Entities' POST Json Format

### Task : /api/task/add/

{ \
  "Name": "Tarefa Teste", \
  "Place": "Homeoffice", \
  "CustomerID": 1, \
  "Start": "2022-04-19T01:22:22.000Z", \
  "UserID": 1 \
}
    
### User : /api/user/add

{ \
  "Name":"Usador de Pogramas", \
  "Phone":"11111111111", \
  "Email":"usador@ufrj.br", \
  "Username":"usador", \
  "Bio":"Teste de criação de usuário via CURL" \
}

### Session : /api/session/add

{\
    "Start": "2021-06-12 05:00:00", \
    "UserID": 2, \
    "End": "2021-06-12 06:00:00" \
}

## Database Diagram

<img src="./DiagramaTabelas.png" width="500" height="400">
