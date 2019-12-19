import * as mongoose from 'mongoose' 

export class Client {
  _id: mongoose.Schema.Types.ObjectId = null
  name: String = null
  email: String = null
  phone: String = null
  user_id: mongoose.Schema.Types.ObjectId = null
}

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

export default mongoose.model('Client', Schema);