import User from '../schemas/UserSchema'
import {ErroResult, SuccessResult, Result} from '@models/Result'

export class UserService{
  	static async signup (username: string, password: string): Promise<Result<any>>{
		const user = new User({
			username,
			password
		})
		try {
			let result = await user.save()
		} catch (error) {
			if(error.code === 11000){
				return new ErroResult('this username exist')
			}
			throw error
		}

		return new SuccessResult()
	}
}