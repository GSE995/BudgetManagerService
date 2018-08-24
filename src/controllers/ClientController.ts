import ClientService from '../services/ClientService'
import Client from '../models/Clients'
import {Express, Response, Request} from 'express'
import { deserialize } from 'json-typescript-mapper'
import * as passport from 'passport'
import config from '../config/index'
import logger from '../config/logger'

export default (app: Express) => {
	app.route('/api/v1/client')
		.all(passport.authenticate('jwt', config.session), (req, res, next) => {
			if(!app.get('budgetsecret')) res.status(403).send()
			next()
		})
		.get(async (req: Request, res: Response) => {
			try {
				
				let result = await ClientService.getByIdAsync(req.query._id)
				res.send(result)

			} catch (error) {
				logger.error(error)
			}
			res.status(500).send()
		} )
		.post(async (req: Request, res: Response) => {
			try {

				let clientDto = deserialize(Client, req.body)

				let result = await ClientService.saveAsync(clientDto)
				
				res.send(result)
                
			} catch (error) {
				logger.error(error)
			}

			res.status(500).send()
		})
		.put(async (req: Request, res: Response) => {
			try {

				let clientDto = deserialize(Client, req.body)

				let result = await ClientService.updateAsync(clientDto)
				
				res.send(result)
                
			} catch (error) {
				logger.error(error)
			}

			res.status(500).send()
		})
		.delete(async (req: Request, res: Response) => {
			try {

				let result  = await ClientService.removeAsync(req.body.client_id)
				
				res.send(result)
                
			} catch (error) {
				logger.error(error)
			}

			res.status(500).send()
		})
}