import UserSchema from '../schemas/UserSchema'
import {ErroResult, SuccessResult, Result} from '@models/Result'
import * as jwt from 'jsonwebtoken'
import config from '../config'

export class AuthService {
	static async login(username: string, password: string) : Promise<Result<any>>{
		let user: any = await UserSchema.findOne({ username})
		if(!user){
			return new ErroResult('Authentication failed. User not found.')
		}
		
		let match = await user.comparePassword(password)

		if(match){
			const token = jwt.sign({user}, config.secret)
			return new SuccessResult('Token granted', {token, user})
		}
		return new ErroResult('Authentication failed. Wrong password.', )
	}
}