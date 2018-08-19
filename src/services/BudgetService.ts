import BudgetSchema from '../schemas/BudgetSchema'
import ClientSchema from '../schemas/ClientSchema'
import {ErroResult, SuccessResult, Result} from '../common/Result'


export default class BudgetService {
    static async saveAsync (data){
        let client  = await ClientSchema.findOne({_id: data.clientId})

		if(!client) return new ErroResult('Invalid client') 

		const budget = new BudgetSchema({
			client_id: data.client,
			user_id: data.user_id,
			client: data.name,
			state: data.state,
			title: data.title,
			description: data.description,
			total_price: data.total_price,
			items: data.items
		});

		let result = await budget.save()

		return new SuccessResult("Budget registered successfully")
    }

    static async getByIdAsync(budgetId: Number){
        let budget = await BudgetSchema.findById(budgetId)

		if(!budget) return new ErroResult('budget not found')

		return new SuccessResult('', budget)
    }

    static async removeAsync(budgetId: Number){
        let result = await BudgetSchema.findByIdAndRemove(budgetId)
		return new SuccessResult('', result)
    }

    static async updateAsync(data){
        let budget = await BudgetSchema.findByIdAndUpdate(data._id, data)

		if(!budget) return new ErroResult('budget not found')

		return new SuccessResult('update success', budget)
    }
}