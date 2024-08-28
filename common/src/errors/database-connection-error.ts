import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    reason = 'Error in DB connection...';
    statusCode = 500;
    constructor() {
        super('Error in DB connection');
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [
            {message: this.reason}
        ];
    }
}