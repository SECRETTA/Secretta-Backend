# Botpress README

Instructions:
1. Get the Botpress archive from the [download link](https://botpress.com/download).
2. Extract **"bp\*"**, **"nlu\*"** binaries in **"Secretta-Backend/botpress/"**.
3. Create JSON at **"botpress/data/bots/secretta/config/channel-telegram.json"** as follows:

    ```json
    {
        "botToken" : "<bot-token>",
        "enabled" : true
    }
    ```