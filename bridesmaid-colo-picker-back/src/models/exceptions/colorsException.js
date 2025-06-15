
export default class ColorException extends Error{

    status;

    constructor(message, status){
        super(message);
        this.name = this.constructor.name;
        this.status = status;
    }
}