import {UserService} from "../services/UserService"
import {ErroResult} from '../common/Result'

export default (app) => {
	app.route('/api/v1/signup')
	   .post(async (req, res) => {
			if (!req.body.username || !req.body.password) res.status(400).json(new ErroResult('Please, pass an username and password.'));

			try {
				let result = await UserService.signup(req.body.username, req.body.password)
				res.status(200).json(result)
			} catch (error) {
				
			}
			res.status(500).send()
	   })
  }