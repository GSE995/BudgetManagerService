export class Result<T>{
	readonly Success: boolean
	Message: string
	Ressult: T
	constructor(message: string = '', result?: T){
		this.Ressult = result
		this.Message = message
	}
}

export class SuccessResult<T> extends Result<T> {
	readonly Success: boolean = true
}

export class ErroResult<T> extends Result<T>{
	readonly Success: boolean = false
}