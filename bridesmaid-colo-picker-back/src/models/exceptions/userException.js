export default class UserException extends Error {
    status;
    constructor(message, status){
        super(message);
        this.name = this.constructor.name;
        this.status = status;
    }
}
