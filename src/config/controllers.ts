import UserController from '../controllers/UserControllers'
import AuthController from '../controllers/AuthController'
import BudgetController from '../controllers/BudgetController'
import ClientController from '../controllers/ClientController'
import {Express} from 'express'

export default (app: Express) => {
	UserController(app)
	AuthController(app)
	BudgetController(app)
	ClientController(app)
}