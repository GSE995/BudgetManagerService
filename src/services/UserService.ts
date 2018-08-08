import User from '../schemas/UserSchema'
import {Result, SuccessResult, ErroResult} from '../common/Result'

export class UserService{
  	static async signup (username: string, password: string): Promise<Result<any>>{
		const user = new User({
			username,
			password
		})
		let result = await user.save()
		return new SuccessResult()
	}
}