import * as mongoose from 'mongoose'

export class User {
    _id: mongoose.Schema.Types.ObjectId
    username: String
    password: String
}