import * as express from 'express'
import * as parser from 'body-parser'
// import * as cors from 'cors'
import * as mongoose from 'mongoose'
import * as bodyParser from 'body-parser'
import * as passport from 'passport'
import * as morgan from 'morgan'

import config from './config'
import database from './config/database'
import passportConfig from './config/passport'
import UseCors from './config/cors'

import AddControllers from './config/controllers'

const BudgetManagerPORT = process.env.PORT || 3001;

const app = express();

database(mongoose, config)
passportConfig(passport)



app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(morgan('combined'))
app.use(bodyParser.json())
// app.use(cors)

UseCors(app)

app.set('budgetsecret', config.secret)
AddControllers(app)

app.listen(BudgetManagerPORT, () => {
	console.log(`Budget manager api running on ${BudgetManagerPORT}`)
})