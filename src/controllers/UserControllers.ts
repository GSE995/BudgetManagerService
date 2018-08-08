import {UserService} from "../services/UserService"
import {ErroResult} from '../common/Result'
import {Express, Response, Request} from 'express'

export default (app: Express) => {
	app.route('/api/v1/signup')
	   .post(async (req: Request, res: Response) => {
			if (!req.body.username || !req.body.password) res.status(400).json(new ErroResult('Please, pass an username and password.'));
			
			try {
				let result = await UserService.signup(req.body.username, req.body.password)
				res.status(200).json(result)
			} catch (error) {
				console.log(error);
			}
			res.status(500).send()
	   })
}