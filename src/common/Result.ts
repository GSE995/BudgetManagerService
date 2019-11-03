export class Result<T>{
	readonly success: boolean
	message: string
	data: T
	constructor(message: string = '', result?: T){
		this.message = message
		this.data = result
	}
}

export class SuccessResult<T> extends Result<T> {
	readonly success: boolean = true
}

export class ErroResult<T> extends Result<T>{
	readonly success: boolean = false
}