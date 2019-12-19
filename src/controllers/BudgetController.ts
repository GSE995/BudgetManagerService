import BudgetService from '../services/BudgetService'
import {Request, Response, Express} from 'express'
import { Budget } from '../schemas/BudgetSchema'
import * as passport from 'passport'
import config from '../config/index'
import logger from '../config/logger'
import {PageParameter} from '@models/Page'
import {BudgetFilter} from '@models/Filters'
import AutoMapper from '../common/AutoMapper'

export default (app: Express) : void => {

    app.route('/api/v1/budget/')
        .all(passport.authenticate('jwt', config.session), (req, res, next) => {
            if(!app.get('budgetsecret')) res.status(403).send()
            next()
        })
        .get(async (req: Request, res: Response)=> {
            try {
              
                if(!req.params.id) res.status(404)
                let id = parseInt(req.params.id)
                if(isNaN(id))
                    res.status(400)

                let result = await BudgetService.getByIdAsync(id)

                res.send(result)
            } catch (error) {
                logger.error(error)
            }
            res.status(500)
        })
        .post(async (req: Request, res: Response) => {
            try {   

                let budgetDto = AutoMapper.mapTo(Budget, req.body)
                let result = BudgetService.saveAsync(budgetDto)
                res.send(result)
            } catch (error) {
                logger.error(error)
            }
            res.status(500).send()
        })
        .delete(async (req: Request, res: Response) => {
            try {
                
                let result = await BudgetService.removeAsync(req.query._id)

                res.send(result)
                
            } catch (error) {
                logger.error(error)
            }

            res.status(500)
        })

    app.route('/api/v1/budget/list/')
		.all(passport.authenticate('jwt', config.session), (req: Request, res: Response, next) => {
			if(!app.get('budgetsecret')) res.status(403).send()
			next()
		})
		.get(async (req: Request, res: Response) => {

            let parameter = new PageParameter(req.query.limit, req.query.skip)
			let filter = new BudgetFilter(req.query)

			try {
                let result = await BudgetService.getListAsync(filter, parameter)
				if(!result.items)res.status(404).send()
				res.send(result)
			} catch (error) {
                logger.error(error)
			}
			res.status(500).send()
		})
}