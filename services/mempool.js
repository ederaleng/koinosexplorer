import { Request as JSONRequest } from './request';

class Mempool extends JSONRequest {
  constructor() {
    super("http://45.56.104.152:8080");
  }
}

export let mempool = new Mempool();