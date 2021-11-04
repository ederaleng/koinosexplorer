// source: koinos/protocol/system_call_ids.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = (function() {
  if (this) { return this; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  if (typeof self !== 'undefined') { return self; }
  return Function('return this')();
}.call(null));

goog.exportSymbol('proto.koinos.protocol.system_call_id', null, global);
/**
 * @enum {number}
 */
proto.koinos.protocol.system_call_id = {
  RESERVED_ID: 0,
  PRINTS: 1,
  VERIFY_BLOCK_HEADER: 2,
  APPLY_BLOCK: 3,
  APPLY_TRANSACTION: 4,
  APPLY_UPLOAD_CONTRACT_OPERATION: 5,
  APPLY_CALL_CONTRACT_OPERATION: 6,
  APPLY_SET_SYSTEM_CALL_OPERATION: 7,
  PUT_OBJECT: 8,
  GET_OBJECT: 9,
  GET_NEXT_OBJECT: 10,
  GET_PREV_OBJECT: 11,
  CALL_CONTRACT: 12,
  GET_ENTRY_POINT: 13,
  GET_CONTRACT_ARGUMENTS_SIZE: 14,
  GET_CONTRACT_ARGUMENTS: 15,
  SET_CONTRACT_RESULT: 16,
  EXIT_CONTRACT: 17,
  GET_HEAD_INFO: 18,
  HASH: 19,
  RECOVER_PUBLIC_KEY: 20,
  VERIFY_BLOCK_SIGNATURE: 21,
  VERIFY_MERKLE_ROOT: 22,
  GET_TRANSACTION_PAYER: 23,
  GET_TRANSACTION_RC_LIMIT: 25,
  GET_LAST_IRREVERSIBLE_BLOCK: 26,
  GET_CALLER: 27,
  REQUIRE_AUTHORITY: 28,
  GET_TRANSACTION_SIGNATURE: 29,
  GET_CONTRACT_ID: 30,
  GET_ACCOUNT_NONCE: 31,
  GET_ACCOUNT_RC: 32,
  CONSUME_ACCOUNT_RC: 33,
  GET_RESOURCE_LIMITS: 34,
  CONSUME_BLOCK_RESOURCES: 35
};

goog.object.extend(exports, proto.koinos.protocol);
