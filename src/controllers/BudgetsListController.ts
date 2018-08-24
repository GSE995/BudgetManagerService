import BudgetListService from '../services/BudgetsListService'
import {Request, Response, Express} from 'express'
import * as passport from 'passport'
import config from '../config/index'
import logger from '../config/logger'

export default (app: Express) => {

	app.route('/api/v1/budget/list/')
		.all(passport.authenticate('jwt', config.session), (req, res, next) => {
			if(!app.get('budgetsecret')) res.status(403).send()
			next()
		})
		.get(async (req: Request, res: Response) => {
			try {

                let result = await BudgetListService.getListAsync(req.query.user_id, req.query.offset, req.query.limit)

				if(!result.items)res.status(404).send()

				res.send(result)

			} catch (error) {
                logger.error(error)
			}
			res.status(500).send()
		})
	
	app.route('/api/v1/budget/list/state')
		.all(passport.authenticate('jwt', config.session), (req, res, next) => {
			if(!app.get('budgetsecret')) res.status(403).send()
			next()
		})
		.get(async (req: Request, res: Response) => {
			try {
				let result = await BudgetListService.getListByState(req.query.state, req.query.offset, req.query.limit)

				if(!result.items)res.status(404).send()

				res.send(result)

			} catch (error) {
				logger.error(error)
			}
			res.status(500).send()
		})
		

	app.route('/api/v1/budget/list/client')
		.all(passport.authenticate('jwt', config.session), (req, res, next) => {
			if(!app.get('budgetsecret')) res.status(403).send()
			next()
		})
		.get(async (req: Request, res: Response) => {
			try {

				let result = await BudgetListService.getListByClientAsync(req.query.client_id, req.query.offset, req.query.limit)

				if(!result.items)res.status(404).send()

				res.send(result)

			} catch (error) {
				logger.error(error)
			}
			res.status(500).send()
		})
}