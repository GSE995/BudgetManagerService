import BudgetSchema, {Budget} from '../schemas/BudgetSchema'
import ClientSchema from '../schemas/ClientSchema'
import {BudgetFilter} from '../common/Filters'
import {ErroResult, SuccessResult} from '@models/Result'
import { PageParameter, PageList } from "@models/Page"

export default class BudgetService {

    static async saveAsync (budgetDto: Budget){

        let client  = await ClientSchema.findOne({_id: budgetDto.client_id})

		if(!client) return new ErroResult('Invalid client') 

		const newBudget = new BudgetSchema(budgetDto);

		let result = await newBudget.save()

		return new SuccessResult("Budget registered successfully", result)
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

    static async updateAsync(budgetDto: Budget){
        let budget = await BudgetSchema.findByIdAndUpdate(budgetDto._id, budgetDto)

		if(!budget) return new ErroResult('budget not found')

		return new SuccessResult('Update success', budget)
    }

    static async getListAsync(filter: BudgetFilter, pageInfo: PageParameter) : Promise<PageList<any>>{

		let total = await BudgetSchema.find(filter).count()

		if(!total) return new PageList<any>([], 0)

		let items = await BudgetSchema.find(filter, null, pageInfo)

		return new PageList<any>(items, total)
	}
}