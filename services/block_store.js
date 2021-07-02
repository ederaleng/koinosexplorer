import { Request as JSONRequest } from './request';


class BlockStore extends JSONRequest {
  constructor() {
    super("http://45.56.104.152:8080");
  }

  get_blocks_by_id(block_ids) {
    let data = {
      block_id: block_ids,
      return_block_blob:true,
      return_receipt_blob:true
    };
    return this.send("block_store.get_blocks_by_id", data);
  }

  get_blocks_by_height(head_block_id, block_height, num_blocks = 1) {
    let data = {
      head_block_id: head_block_id,
      ancestor_start_height: block_height,
      num_blocks:     num_blocks,
      return_block:   false,
      return_receipt: false
    };
    return this.send("block_store.get_blocks_by_height", data);
  }
}

export let block_store = new BlockStore();