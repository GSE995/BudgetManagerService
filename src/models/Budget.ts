import * as mongoose from 'mongoose'

export class Budget  {
    _id: mongoose.Schema.Types.ObjectId = null
    client: string = null
    state: string = null
    title: string = null
    total_price: number = null
    client_id: mongoose.Schema.Types.ObjectId = null
    description: string = null
    items: Array<Object> = null
}