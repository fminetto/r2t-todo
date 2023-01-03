export class Task {
    constructor(
        private ID: string,
        private title:string,
        private description: string,
        private creation:string,
        private completed: boolean = false
    ){}
}