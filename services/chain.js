import { Request as JSONRequest } from './request';

class Chain extends JSONRequest {
  constructor() {
    super(process.env.endpoint);
  }

  get_head() {
    let data = {};
    return this.send("chain.get_head_info", data);
  }
  get_chain_id() {
    let data = {};
    return this.send("chain.get_chain_id", data);
  }
  
  get_contract(contract_id, entry_point, args) {
    let data = {
      contract_id: contract_id,
      entry_point: entry_point,
      args: args
    };
    return this.send("chain.read_contract", data);
  }
}

export let chain = new Chain();