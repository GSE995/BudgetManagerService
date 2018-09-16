import ClientService from '../services/ClientService'
import Client from '../models/Clients'
import {Express, Response, Request} from 'express'
import { deserialize } from 'json-typescript-mapper'
import * as passport from 'passport'
import config from '../config/index'
import logger from '../config/logger'
import FilterFactory from '../schemas/filters/FilterFactory';
import PageParameter from '../common/PageParameter';
import ClientFilter from '../schemas/filters/ClientFilter';

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

		app.route('/api/v1/client/list/')
			.all(passport.authenticate('jwt', config.session), (req, res, next) => {
				if(!app.get('budgetsecret')) res.status(403).send()
				next()
			})
			.get(async (req: Request, res: Response) => {

				let parameter = new PageParameter(req.query.limit, req.query.skip)
				let filter = FilterFactory.create<ClientFilter>(ClientFilter, req.query)

				try {
					let result = await ClientService.getListAsync(filter, parameter)
					if(!result.items)res.status(404).send()
					res.send(result)
				} catch (error) {
					logger.error(error)
				}
				res.status(500).send()
			})
}