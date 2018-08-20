import { PageList, IPageList } from "../common/PageList"
import BudgetSchema from "../schemas/BudgetSchema"

export default class BudgetsListService {
    static async getListAsync(userId: number, skip: number, limit: number) : Promise<IPageList<any>>{

		let total = await BudgetSchema.find({user_id: userId}).count()

		if(!total) return new PageList<any>([], 0)

		let items = await BudgetSchema.find({user_id: userId}).skip(skip).limit(limit)

		return new PageList<any>(items, total)
	}

	static async getListByClientAsync(clientId: number, skip: number, limit: number ) : Promise<IPageList<any>>{

		let total = await BudgetSchema.find({client_id: clientId}).count()

		if(!total) return new PageList<any>([], 0)

		let items = await BudgetSchema.find({client_id: clientId}).skip(skip).limit(limit)

		return new PageList<any>(items, total)
	}

	static async getListByState(state: string, skip: number, limit: number ) : Promise<IPageList<any>>{
		let total = await BudgetSchema.find({state: state}).count()

		if(!total) return new PageList<any>([], 0)

		let budgets = await BudgetSchema.find({state: state}).skip(skip).limit(limit)

		return new PageList<any>(budgets, total)
	}
}