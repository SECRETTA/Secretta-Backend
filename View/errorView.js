class errorView {
    constructor(code) {
        this.code = code
    }
    html() {
        return `
        <html>
            <head>
                <style>
                h1 {
                    font-family: Helvetica
                }
                </style>
            </head>
            <body>
                <h1> Error ${this.code} </h1>
            </body>
        </html>
        `
    }
}

module.exports = errorView