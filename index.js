const customExpress = require('./config/customExpress');
const DataBase = require('./Infrastructure/database');
const TableInit = require('./Infrastructure/tableInit');
const SecrettaBot = require('./TelegramBot/secrettaBot');
const cors = require('cors');
const app = customExpress();

TableInit.run(console.log);

let bot = new SecrettaBot;

bot.run();

app.use(cors())
app.listen(3000, () => {
    console.log(`\x1b[35;1m
    ░██████╗███████╗░█████╗░██████╗░███████╗\x1b[31m████████╗████████╗\x1b[35m░█████╗░\x1b[31mTM\x1b[35m
    ██╔════╝██╔════╝██╔══██╗██╔══██╗██╔════╝\x1b[31m╚══██╔══╝╚══██╔══╝\x1b[35m██╔══██╗
    ╚█████╗░█████╗░░██║░░╚═╝██████╔╝█████╗░░░░░\x1b[31m██║\x1b[35m░░░░░░\x1b[31m██║\x1b[35m░░░\x1b[35m███████║
    ░╚═══██╗██╔══╝░░██║░░██╗██╔══██╗██╔══╝░░░░░\x1b[31m██║\x1b[35m░░░░░░\x1b[31m██║\x1b[35m░░░\x1b[35m██╔══██║
    ██████╔╝███████╗╚█████╔╝██║░░██║███████╗░░░\x1b[31m██║\x1b[35m░░░░░░\x1b[31m██║\x1b[35m░░░\x1b[35m██║░░██║
    ╚═════╝░╚══════╝░╚════╝░╚═╝░░╚═╝╚══════╝░░░\x1b[31m╚═╝\x1b[35m░░░░░░\x1b[31m╚═╝\x1b[35m░░░\x1b[35m╚═╝░░╚═╝
    \x1b[0m
    \x1b[36mServidor rodando na porta 3000.\x1b[0m
    \x1b[36m${new DataBase}\x1b[0m`
    );
});