// customError.js
class ErrorResponse {
    constructor(message, data) {
        this.success = false;
        this.message = message;
        this.data = data || null;
    }
}

class SuccessResponse {
    constructor(message, data) {
        this.success = true;
        this.message = message;
        this.data = data;
    }
}

module.exports = { ErrorResponse, SuccessResponse };
