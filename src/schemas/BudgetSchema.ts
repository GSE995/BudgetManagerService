import * as mongoose from 'mongoose'
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

const Schema = new mongoose.Schema({
	client: {
	  type: String,
	  required: true
	},
  
	state: {
	  type: String,
	  required: true
	},
  
	title: {
	  type: String,
	  required: true
	},
  
	total_price: {
	  type: Number,
	  required: true
	},
  
	client_id: {
	  type: mongoose.Schema.Types.ObjectId,
	  ref: 'Client'
	},
	description: {
	  type: String,
	  required: true
	},
	items: [{}]
});

export default mongoose.model('Budget', Schema);