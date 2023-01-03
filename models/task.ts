export class Task {
    constructor(
        private title:string,
        private description: string,
        private creation:Date,
        private completed: boolean = false
    ){}
}