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
        return this.ValidateLength(param, 30) // && (param.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/) !== null)
    }


    ValidateAll(jsonBody) {
        return (
            this.ValidateEmail(jsonBody.Email)
        )
    }
}

export {
    ValidateEmail
}