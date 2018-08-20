import { Result, SuccessResult, ErroResult } from '../common/Result'
import ClientSchema from '../schemas/ClientSchema'
import { Client } from '../models/Clients'

export default class ClientService {
    
	static async saveAsync(client: Client) : Promise<Result<any>>{

		let newclient = new ClientSchema(client)

		let result = await newclient.save()

		return new SuccessResult('Client add success', result)
	}

	static async getByIdAsync(clientId: Number) : Promise<Result<any>>{
		let client = ClientSchema.findById(clientId)

		if(!client) return new ErroResult('client not found')

		return new SuccessResult('', client)
	}

	static async updateAsync(client: Client) : Promise<Result<any>>{
		let result = await ClientSchema.findByIdAndUpdate(client._id, client)
		return new SuccessResult('sucess update client', result)
	}

	static async removeAsync(clientId: number) : Promise<Result<any>>{
		let result = await ClientSchema.findByIdAndRemove(clientId)
		return new SuccessResult('', result)
	}
}