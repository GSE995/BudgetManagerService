import {Types} from 'mongoose'

export class Budget  {
    _id: Types.ObjectId = null
    client: string = null
    state: string = null
    title: string = null
    total_price: number = null
    client_id: Types.ObjectId = null
    user_id: Types.ObjectId = null
    description: string = null
    items: Array<Object> = null
}