import {AuthService} from '../services/AuthService'
import {Express, Response, Request} from 'express'
import logger from '../config/logger'

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
                logger.error(error)
            }
            res.status(500).send()
        });
}