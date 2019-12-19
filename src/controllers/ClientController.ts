import * as passport from 'passport'
import {Express, Response, Request} from 'express'
import config from '../config/index'
import logger from '../config/logger'
import {PageParameter} from '@models/Page'
import {ClientFilter} from '@models/Filters'
import ClientService from '../services/ClientService'
import {Client} from '../schemas/ClientSchema'
import AutoMapper from '../common/AutoMapper'

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

				let clientDto = AutoMapper.mapTo(Client, req.body)

				let result = await ClientService.saveAsync(clientDto)
				
				res.send(result)
                
			} catch (error) {
				logger.error(error)
			}

			res.status(500).send()
		})
		.put(async (req: Request, res: Response) => {
			try {

				let clientDto = AutoMapper.mapTo(Client, req.body)

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
				let filter = new ClientFilter(req.query)

				try {
					let result = await ClientService.getListAsync(filter, parameter)
					res.send(result.data)
				} catch (error) {
					logger.error(error)
				}
				res.status(500).send()
			})
}