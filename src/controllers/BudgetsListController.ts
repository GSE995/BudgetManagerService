import BudgetListService from '../services/BudgetsListService'
import {Request, Response, Express} from 'express'

export default (app: Express) => {

	app.route('/api/v1/budget/list/')
		.get(async (req: Request, res: Response) => {
			try {

                let result = await BudgetListService.getListAsync(req.query.user_id, req.query.offset, req.query.limit)

				if(!result.items)res.status(404).send()

				res.send(result)

			} catch (error) {
                // logger
			}
			res.status(500).send()
		})
	
	app.route('/api/v1/budget/list/state')
		.get(async (req: Request, res: Response) => {
			try {
				let result = await BudgetListService.getListByState(req.query.state, req.query.offset, req.query.limit)

				if(!result.items)res.status(404).send()

				res.send(result)

			} catch (error) {
				 // logger
			}
			res.status(500).send()
		})
		

	app.route('/api/v1/budget/list/client')
		.get(async (req: Request, res: Response) => {
			try {

				let result = await BudgetListService.getListByClientAsync(req.query.client_id, req.query.offset, req.query.limit)

				if(!result.items)res.status(404).send()

				res.send(result)

			} catch (error) {
				 // logger
			}
			res.status(500).send()
		})
}