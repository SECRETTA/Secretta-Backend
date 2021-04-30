class errorView {
    constructor(code) {
        this.code = code
        this.messages = []
    }

    message (msg) {
        this.messages.push(msg)
    }

    html() {
        return `
        <html>
            <head>
                <style>
                body {
                    font-family: Helvetica
                }
                </style>
            </head>
            <body>
                <h1> Error ${this.code} </h1>
                <p> ${this.messages.join('\n<br>\n')} </p>
            </body>
        </html>
        `
    }
}

module.exports = errorView