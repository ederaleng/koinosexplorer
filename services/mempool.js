import { Request as JSONRequest } from './request';

class Mempool extends JSONRequest {
  constructor() {
    super(process.env.endpoint);
  }
}

export let mempool = new Mempool();