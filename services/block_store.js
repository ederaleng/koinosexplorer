import ProtoBlockStore from '@/proto/koinos/rpc/block_store/block_store_rpc_pb';
import { Request as JSONRequest } from './request';

class BlockStore extends JSONRequest {
  constructor() {
    super(process.env.endpoint);
  }

  get_blocks_by_id(block_ids) {
    let message = new ProtoBlockStore.get_blocks_by_id_request({
      blockId: block_ids,
      returnBlock: true,
      returnReceipt: true
    })
    let data = message.toObject()
    return this.send("block_store.get_blocks_by_id", data);
  }

  get_blocks_by_height(head_block_id, block_height, num_blocks = 1) {
    let message = new ProtoBlockStore.get_blocks_by_height_request()
    message.setHeadBlockId(head_block_id)
    message.setAncestorStartHeight(block_height)
    message.setNumBlocks(num_blocks)
    message.setReturnBlock(true)
    message.setReturnReceipt(false)
    let data = message.toObject()
    return this.send("block_store.get_blocks_by_height", data);
  }

  get_transactions_by_id(tx_ids = []) {
    let data = {
      transaction_ids: [ tx_ids ],
    };
    return this.send("block_store.get_transactions_by_id", data);
  }
}

export let block_store = new BlockStore();