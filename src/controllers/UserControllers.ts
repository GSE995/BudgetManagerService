import {UserService} from "../services/UserService"
import {ErroResult} from '@models/Result'
import {Express, Response, Request} from 'express'
import logger from "../config/logger"

export default (app: Express) => {
	app.route('/api/v1/signup')
	   .post(async (req: Request, res: Response) => {
			if (!req.body.username || !req.body.password) return res.status(400).json(new ErroResult('Please, pass an username and password.'));
			
			try {
				let result = await UserService.signup(req.body.username, req.body.password)
				res.status(200).json(result)
			} catch (error) {
				logger.error(error)
			}
			res.status(500).send()
	   })
}