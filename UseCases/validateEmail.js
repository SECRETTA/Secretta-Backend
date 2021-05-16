class ValidateEmail {

    isString(s) {
        return (typeof s === 'string' || s instanceof String)
    }

    ValidateLength(param, len) {
        if (this.isString(param) && (param.length <= len)) {
            return true
        }
        else {
            return false
        }
    }

    ValidateEmail(param) {
        return this.ValidateLength(param, 30) && (param.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/) !== null)
    }

    ValidateTimestamp(param){
        return this.ValidateLength(param, 20) && (param.match(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/) !== null)
    }

    ValidateAll(jsonBody) {
        console.log(jsonBody)
        return (
            this.ValidateEmail(jsonBody.Email) && this.ValidateTimestamp(jsonBody.Timestamp)
        )
    }

}

module.exports = ValidateEmail