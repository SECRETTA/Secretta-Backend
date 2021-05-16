const fs = require('fs');
const toml = require('toml');
const TelegramBot = require('node-telegram-bot-api');

class SecrettaBot {

    constructor(configPath = './TelegramBot/bot.conf') {
        // Here we create a singleton for DataBase.
        // This means there will exist only one instance from this class.
        if (SecrettaBot.__ref__ === undefined) {
            // Reference singleton instance.
            SecrettaBot.__ref__ = this;
            // Initialize instance
            this.init(configPath);
        }
        return SecrettaBot.__ref__;
    }

    init(configPath) {
        this.config = toml.parse(fs.readFileSync(configPath, 'utf-8'));
    }

    run() {
        this.bot = new TelegramBot(this.config.bot.token, { 'polling': true, 'onlyFirstMatch': true })

        console.log(`    [ OK ] Bot acordado.`)

        this.bot.onText(/\/start/, (msg, match) => {
            let text = 'Bom dia, eu sou a Secretta. Como posso ajudar?'

            const options = {
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{ text: 'Agendar', callback_data: 'agendar' }],
                        [{ text: 'Cancelar', callback_data: 'cancelar' }],
                    ]
                })
            };

            this.bot.sendMessage(msg.chat.id, text, options);
        })

        this.bot.onText(/\/[a-z]+/, (msg, match) => {
            this.bot.sendMessage(msg.chat.id, `Não conheço o comando ${match}, desculpa.`);
        })

        this.bot.onText(/.*/, (msg, match) => {
            this.bot.sendMessage(msg.chat.id, `Não entendi.`);
        })

        this.bot.on('callback_query', (query) => {
            const action = query.data;
            const msg = query.message;
            const options = {
                chat_id: msg.chat.id,
                message_id: msg.message_id,
            };

            switch (action) {
                case 'agendar':
                    this.bot.answerCallbackQuery(query.id, options);
                    this.bot.editMessageText('Vou agendar para você, pode deixar!', options);
                    break;
                case 'cancelar':
                    this.bot.answerCallbackQuery(query.id, options);
                    this.bot.editMessageText('Vou cancelar para você, fique tranquile!', options);
                    break;
                default:
                    console.log('Unknown action:', action);
                    break;
            }
        });
    }
}

module.exports = SecrettaBot;