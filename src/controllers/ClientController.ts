import ClientService from '../services/ClientService'
import Client from '../models/Clients'
import {Express, Response, Request} from 'express'
import { deserialize } from 'json-typescript-mapper'

export default (app: Express) => {
	app.route('/api/v1/client')
		.get(async (req: Request, res: Response) => {
			try {
				let result = await ClientService.getByIdAsync(req.query._id)

			} catch (error) {
				
			}

			res.status(500).send()
		} )
		.post(async (req: Request, res: Response) => {
			try {
				let clientDto = deserialize(Client, req.body)

                let result = await ClientService.saveAsync(clientDto)
                
			} catch (error) {
				
			}

			res.status(500).send()
		})
		.put(async (req: Request, res: Response) => {
			try {

                let result = await ClientService.updateAsync(req.body)
                
			} catch (error) {
				
			}

			res.status(500).send()
		})
		.delete(async (req: Request, res: Response) => {
			try {

                let result  = await ClientService.removeAsync(req.body.client_id)
                
			} catch (error) {
				
			}

			res.status(500).send()
		})
}