export class Result {
    constructor(
        public message: string,
        public succes: boolean,
        public data: any,
        public errors: any
    ) {
        
    }
}