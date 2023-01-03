export class Task {
    constructor(
        readonly ID: string,
        readonly title:string,
        readonly description: string,
        readonly creation:string,
        readonly completed: boolean = false
    ){}
}