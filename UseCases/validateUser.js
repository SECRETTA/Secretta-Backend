class ValidateUser {

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

    ValidateName(param) {
        return this.ValidateLength(param, 30) // && (param.match(/^[\S ]+$/u) !== null);
    }

    ValidatePhone(param) {
        return this.ValidateLength(param, 11) // && (param.match(/^(\+[1-9][0-9]{1,2})?[ ]?([1-9][0-9])?[ ]?([1-9][0-9]{7,9})$/) !== null)
    }

    ValidateEmail(param) {
        return this.ValidateLength(param, 30) // && (param.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/) !== null)
    }

    ValidateUsername(param) {
        return this.ValidateLength(param, 12)
    }

    ValidateBio(param) {
        return this.ValidateLength(param, 100)
    }

    ValidateAll(jsonBody) {
        return (
            this.ValidateName(jsonBody.Name)
            && this.ValidatePhone(jsonBody.Phone)
            && this.ValidateEmail(jsonBody.Email)
            && this.ValidateUsername(jsonBody.Username)
            && this.ValidateBio(jsonBody.Bio)
        )
    }
}

module.exports = ValidateUser