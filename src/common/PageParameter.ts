export default class PageParameter {
    skip: number
    limit: number
    sort: string

    constructor(limit: string, skip: string, sort?:string){
        this.limit = parseInt(limit) 
        this.skip = parseInt(skip)
        this.sort = sort
    }
}