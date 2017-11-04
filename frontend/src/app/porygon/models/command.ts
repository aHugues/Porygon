export class Command {
    public id: number;
    public title: string;
    public remarks: string;

    constructor(command?: Command) {
        this.id = command && command.id || null;
        this.title = command && command.title || null;
        this.remarks = command && command.remarks || null;
    }

}
