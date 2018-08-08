import UserController from '../controllers/UserControllers'
import {Express} from 'express'

export default (app: Express) => {
	UserController(app)
}