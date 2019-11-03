export default class AutoMapper {
    static mapTo<T>(Type: {new() : T}, payload: any) : T {
        let t = new Type()
        for(let prop in t){
            t[prop] = payload[prop]
        }
        return t
    }
}
