export class Access {
    username: string;
    timestamp: Date;

    constructor(username: string) {
        this.username = username;
        this.timestamp = new Date();
    }
}