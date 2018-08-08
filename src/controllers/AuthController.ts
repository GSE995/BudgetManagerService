import {AuthService} from '../services/AuthService'
import {Express, Response, Request} from 'express'

export default (app: Express) => {
			
	app.route('/api/v1/auth')
		.post(async (req: Request, res: Response) => {
			try {
				let result = await AuthService.login(req.body.username, req.body.password)
				if(!result.Success){
					res.status(404).send(result)
				}
				res.json(result)

			} catch (error) {
				console.log(error.message)
			}
			res.status(500).send()
		});
}