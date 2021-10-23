import Proto from './proto'
import { Request as JSONRequest } from './request';

const ProtoBlockStore = Proto.block_store;

class BlockStore extends JSONRequest {
  constructor() {
    super(process.env.endpoint);
  }

  get_blocks_by_id(block_ids) {
    let data = new ProtoBlockStore.get_blocks_by_id_request({
      blockId: block_ids,
      returnBlock: true,
      returnReceipt: true
    })
    return this.send("block_store.get_blocks_by_id", data);
  }

  get_blocks_by_height(head_block_id, block_height, num_blocks = 1) {
    let data = new ProtoBlockStore.get_blocks_by_height_request({
      headBlockId: head_block_id,
      ancestorStartHeight: block_height,
      numBlocks: num_blocks,
      returnBlock: true,
      returnReceipt: true
    })
    return this.send("block_store.get_blocks_by_height", data);
  }

  get_transactions_by_id(tx_ids = []) {
    let data = {
      transaction_ids: [ tx_ids ],
    };
    console.log(data)
    return this.send("block_store.get_transactions_by_id", data);
  }
}

export let block_store = new BlockStore();