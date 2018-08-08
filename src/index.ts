import * as express from 'express'
import * as parser from 'body-parser'
import * as cors from 'cors'
import * as mongoose from 'mongoose'
import * as bodyParser from 'body-parser'
import * as passport from 'passport'
import * as morgan from 'morgan'

import config from './config'
import database from './config/database'

import AddControllers from './config/controllers'

const BudgetManagerPORT = process.env.PORT || 3001;

const app = express();

database(mongoose, config)


app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(morgan('combined'))
app.use(bodyParser.json())

AddControllers(app)

app.listen(BudgetManagerPORT, () => {
	console.log(`Budget manager api running on ${BudgetManagerPORT}`)
})