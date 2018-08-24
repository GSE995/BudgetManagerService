import BudgetService from '../services/BudgetService'
import {Request, Response, Express} from 'express'
import {deserialize} from 'json-typescript-mapper'
import { Budget } from '../models/Budget'
import * as passport from 'passport'
import config from '../config/index'
import logger from '../config/logger'

export default (app: Express) : void => {

    app.route('/api/v1/budget/')
        .all(passport.authenticate('jwt', config.session), (req, res, next) => {
            if(!app.get('budgetsecret')) res.status(403).send()
            next()
        })
        .get(async (req: Request, res: Response)=> {
            try {
              
                if(!req.params.id) res.status(404)
                let result = await BudgetService.getByIdAsync(req.params.id)

                res.send(result)
            } catch (error) {
                logger.error(error)
            }
            res.status(500)
        })
        .post(async (req: Request, res: Response) => {
            try {   

                let budgetDto = deserialize(Budget, req.body)
                let result = BudgetService.saveAsync(budgetDto)
                
            } catch (error) {
                logger.error(error)
            }
            res.status(500)
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
}