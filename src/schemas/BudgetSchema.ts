import * as mongoose from 'mongoose'

export class Budget{
	client: string
	state: string
	title: string
	total_price: number
	client_id: mongoose.Schema.Types.ObjectId 
	description: string
	items: Array<Object>
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