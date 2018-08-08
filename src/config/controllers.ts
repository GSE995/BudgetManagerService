import UserController from '../controllers/UserControllers'
import AuthController from '../controllers/AuthController'
import {Express} from 'express'

export default (app: Express) => {
	UserController(app)
	AuthController(app)
}