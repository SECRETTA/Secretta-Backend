class ValidateSession {

    isString(s){
        return (typeof s === 'string' || s instanceof String);
    }

    isNumber(i){
        return (typeof i == 'number');
    }

    ValidateLength(param, len) {
        if (this.isString(param) && (param.length == len)){
            return true;
        } else {
            return false;
        }
    }

    ValidateTimeStamp(param) {
        if(this.isString(param) && this.ValidateLength(param, 19)){
            return (param.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s[0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]{1,3})?$/)!==null)
        } else {
            console.log("Session is not in String Format or has not length equal to 19")
            return false;
        }
    }

    ValidateExactHour(param){
        if(param.slice(14,19) == "00:00"){
            return true;
        } else {
            console.log("Session Datetime doesn't have an exact hour");
            return false;
        }
    }

    ValidateInterval(start, end) {
        if(this.ValidateExactHour(start) && this.ValidateExactHour(end)){
            var start_string_hour = start.slice(11,13);
            var end_string_hour = end.slice(11,13)
            if(Number(start_string_hour)+1==Number(end_string_hour)){
                return true;
            } else {
                console.log("Interval Between Start and End time must be 1 hour");
                return false;
            }
        } else {
            return false;
        }
    }

    ValidateSession(jsonBody){
        if(this.ValidateTimeStamp(jsonBody.Start) && this.ValidateTimeStamp(jsonBody.End) && this.isNumber(jsonBody.UserID)){
            return this.ValidateInterval(jsonBody.Start, jsonBody.End)
        } else {
            return false;
        }
    }

}

module.exports = ValidateSession