import * as mongoose from 'mongoose'

export default class Client {
    _id: mongoose.Schema.Types.ObjectId = null
    name: String = null
    email: String = null
    phone: String = null
    user_id: mongoose.Schema.Types.ObjectId = null
}