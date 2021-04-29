# Create Tables and Populate Database
curl -X GET localhost:3000/api/init

# Post new user
curl -X POST -H "Content-Type: application/json" -d '{"Name":"Usador de Pogramas","Phone":"11111111111","Email":"usador@ufrj.br","Username":"usador","Bio":"Teste de criação de usuário via CURL"}' localhost:3000/api/user/add

# Get new user
curl -X GET localhost:3000/api/user/usador

# Get all users
curl -X GET localhost:3000/api/user

# Get all tasks
curl -X GET localhost:3000/api/tasks

#Update User
curl -X POST -H "Content-Type: application/json" -d '{"Name":"Usador de Pogramas","Phone":"22222222222","Email":"usador@ufrj.br","Username":"usador","Bio":"Teste de criação de usuário via CURL"}' localhost:3000/api/user/update

#Delete User (We need all User atributes for security reasons)
curl -X POST -H "Content-Type: application/json" -d '{"Name":"Usador de Pogramas","Phone":"22222222222","Email":"usador@ufrj.br","Username":"usador","Bio":"Teste de criação de usuário via CURL"}' localhost:3000/api/user/delete