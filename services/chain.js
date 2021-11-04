import ProtoChain from '@/proto/koinos/rpc/chain/chain_rpc_pb';
import { Request as JSONRequest } from './request';

class Chain extends JSONRequest {
  constructor() {
    super(process.env.endpoint);
  }

  get_head() {
    let message = new ProtoChain.get_head_info_request()
    let data = message.toObject()
    return this.send("chain.get_head_info", data);
  }
  get_chain_id() {
    let message = new ProtoChain.get_chain_id_request()
    let data = message.toObject()
    return this.send("chain.get_chain_id", data);
  }
  
  get_contract(contract_id, entry_point, args) {
    let message = new ProtoChain.read_contract_request();
    message.setContractId(contract_id)
    message.setEntryPoint(entry_point)
    message.setArgs(args)
    let data = message.toObject()
    return this.send("chain.read_contract", data);
  }
}

export let chain = new Chain();