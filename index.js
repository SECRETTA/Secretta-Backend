const customExpress = require('./config/customExpress');
const TableInit = require('./Infrastructure/tableInit');
const app = customExpress();

app.listen(3000, () => console.log(`\x1b[35;1m
    ░██████╗███████╗░█████╗░██████╗░███████╗\x1b[31m████████╗████████╗\x1b[35m░█████╗░\x1b[31mTM\x1b[35m
    ██╔════╝██╔════╝██╔══██╗██╔══██╗██╔════╝\x1b[31m╚══██╔══╝╚══██╔══╝\x1b[35m██╔══██╗
    ╚█████╗░█████╗░░██║░░╚═╝██████╔╝█████╗░░░░░\x1b[31m██║\x1b[35m░░░░░░\x1b[31m██║\x1b[35m░░░\x1b[35m███████║
    ░╚═══██╗██╔══╝░░██║░░██╗██╔══██╗██╔══╝░░░░░\x1b[31m██║\x1b[35m░░░░░░\x1b[31m██║\x1b[35m░░░\x1b[35m██╔══██║
    ██████╔╝███████╗╚█████╔╝██║░░██║███████╗░░░\x1b[31m██║\x1b[35m░░░░░░\x1b[31m██║\x1b[35m░░░\x1b[35m██║░░██║
    ╚═════╝░╚══════╝░╚════╝░╚═╝░░╚═╝╚══════╝░░░\x1b[31m╚═╝\x1b[35m░░░░░░\x1b[31m╚═╝\x1b[35m░░░\x1b[35m╚═╝░░╚═╝
    \x1b[0m
    \x1b[36mServidor rodando na porta 3000.\x1b[0m`
)
);

app.get('/api/init', (req, res) => {

    var error_stack = [];

    TableInit.createTables(err => {
        error_stack.push(err);
    });

    if (error_stack.length > 0) {
        res.status(500).send(error_stack.join('\n'));
        return;
    }

    TableInit.populateDatabase(err => {
        error_stack.push(err);
    });

    if (error_stack.length > 0) {
        res.status(500).send(error_stack.join('\n'));
        return;
    }

    res.status(200).send("Tabelas criadas e populadas com sucesso.\n");
})
