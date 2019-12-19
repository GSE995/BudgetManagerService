import { ErroResult, SuccessResult, Result } from "@models/Result"
import ClientSchema, { Client } from "../schemas/ClientSchema"
import { PageParameter, PageList } from "@models/Page"
import { ClientFilter } from "../common/Filters"

export default class ClientService {
  static async saveAsync(client: Client): Promise<Result<any>> {
    let newclient = new ClientSchema(client);

    let result = await newclient.save();

    return new SuccessResult("Client add success", result);
  }

  static async getByIdAsync(clientId: Number): Promise<Result<any>> {
    let client = ClientSchema.findById(clientId);

    if (!client) return new ErroResult("client not found");

    return new SuccessResult("", client);
  }

  static async updateAsync(client: Client): Promise<Result<any>> {
    let result = await ClientSchema.findByIdAndUpdate(client._id, client);
    return new SuccessResult("sucess update client", result);
  }

  static async removeAsync(clientId: number): Promise<Result<any>> {
    let result = await ClientSchema.findByIdAndRemove(clientId);
    return new SuccessResult("", result);
  }

  static async getListAsync( filter: ClientFilter, pageInfo: PageParameter
  ): Promise<Result<any>> {

    let total = await ClientSchema.find(filter).count();

    if (!total) return new SuccessResult("", new PageList<any>([], 0));

    let items = await ClientSchema.find(filter, null, pageInfo);

    return new SuccessResult("", new PageList<any>(items, total));
  }
}
