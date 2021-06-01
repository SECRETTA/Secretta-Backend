const customExpress = require('./config/customExpress');
const DataBase = require('./Infrastructure/database');
const TableInit = require('./Infrastructure/tableInit');
// const SecrettaBot = require('./TelegramBot/secrettaBot');
const app = customExpress();

TableInit.run(console.log);

// let bot = new SecrettaBot;

// bot.run();

port = 3001

app.listen(port, () => {
    console.log(`\x1b[35;1m
    ░██████╗███████╗░█████╗░██████╗░███████╗\x1b[31m████████╗████████╗\x1b[35m░█████╗░\x1b[31mTM\x1b[35m
    ██╔════╝██╔════╝██╔══██╗██╔══██╗██╔════╝\x1b[31m╚══██╔══╝╚══██╔══╝\x1b[35m██╔══██╗
    ╚█████╗░█████╗░░██║░░╚═╝██████╔╝█████╗░░░░░\x1b[31m██║\x1b[35m░░░░░░\x1b[31m██║\x1b[35m░░░\x1b[35m███████║
    ░╚═══██╗██╔══╝░░██║░░██╗██╔══██╗██╔══╝░░░░░\x1b[31m██║\x1b[35m░░░░░░\x1b[31m██║\x1b[35m░░░\x1b[35m██╔══██║
    ██████╔╝███████╗╚█████╔╝██║░░██║███████╗░░░\x1b[31m██║\x1b[35m░░░░░░\x1b[31m██║\x1b[35m░░░\x1b[35m██║░░██║
    ╚═════╝░╚══════╝░╚════╝░╚═╝░░╚═╝╚══════╝░░░\x1b[31m╚═╝\x1b[35m░░░░░░\x1b[31m╚═╝\x1b[35m░░░\x1b[35m╚═╝░░╚═╝
    \x1b[0m
    \x1b[36mServidor rodando na porta ${port}.\x1b[0m
    \x1b[36m${new DataBase}\x1b[0m`
    );
});