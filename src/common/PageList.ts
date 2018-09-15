export default class PageList<T> {
    items: Array<T>
    total: number

    constructor(items: Array<T>, total: number){
        this.items = items
        this.total = total
    }
}