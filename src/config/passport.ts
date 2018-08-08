import * as PassportJWT from 'passport-jwt'
import UserSchema from '../schemas/UserSchema'
import config from './index'
import {PassportStatic} from 'passport'

const ExtractJWT = PassportJWT.ExtractJwt
const Strategy = PassportJWT.Strategy

export default (passport: PassportStatic) => {
	const User = UserSchema
	const parameters = {
		secretOrKey: config.secret,
		jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
	};

	const strategy = new Strategy(parameters, (payload, done) => {
		User.findOne({ id: payload.id }, (error, user) => {
			if (error) return done(error, false);
			if (user) done(null, user);
			else done(null, false);
		});
	})

	passport.use(strategy);
}