import BudgetService from '../services/BudgetService'
import {Request, Response, Express} from 'express'
import {deserialize} from 'json-typescript-mapper'
import { Budget } from '../models/Budget';

export default (app: Express) : void => {
    app.route('/api/v1/budget/')
        .get(async (req: Request, res: Response)=> {
            try {
              
                if(!req.params.id) res.status(404)
                let result = await BudgetService.getByIdAsync(req.params.id)

                res.send(result)
            } catch (error) {
                // todo: logger
            }
            res.status(500)
        })
        .post(async (req: Request, res: Response) => {
            try {
                
                let budgetDto = deserialize(Budget, req.body)

                let result = BudgetService.saveAsync(budgetDto)
            } catch (error) {
                // todo: logger
            }
            res.status(500)
        })
        .delete(async (req: Request, res: Response) => {
            try {
                
                let result = await BudgetService.removeAsync(req.query._id)

                res.send(result)
                
            } catch (error) {
                // todo: logger
            }

            res.status(500)
        })
}