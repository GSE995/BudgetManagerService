import * as express from 'express'
import * as parser from 'body-parser'
import * as cors from 'cors'
import * as mongoose from 'mongoose'
import * as bodyParser from 'body-parser'
import * as passport from 'passport'
import * as morgan from 'morgan'

const BudgetManagerPORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(morgan('combined'))
app.use(bodyParser.json())

app.listen(BudgetManagerPORT, () => {
	console.log(`Budget manager api running on ${BudgetManagerPORT}`)
})