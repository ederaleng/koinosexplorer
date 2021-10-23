import Proto from './proto'
import { Request as JSONRequest } from './request';

const ProtoChain = Proto.chain;

class Chain extends JSONRequest {
  constructor() {
    super(process.env.endpoint);
  }

  get_head() {
    let data = new ProtoChain.get_head_info_request();
    return this.send("chain.get_head_info", data.toJSON());
  }
  get_chain_id() {
    let data = new ProtoChain.get_chain_id_request();
    return this.send("chain.get_chain_id", data.toJSON());
  }
  
  get_contract(contract_id, entry_point, args) {
    let data = new ProtoChain.read_contract_request({
      contractId: contract_id,
      entryPoint: entry_point,
      args: args
    });
    return this.send("chain.read_contract", data.toJSON());
  }
}

export let chain = new Chain();