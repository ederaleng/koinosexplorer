import base58 from 'bs58';
import ByteBuffer from 'bytebuffer';

export const to_bytes = (x) => {
  let buffer = Buffer.from(x, 'base64');
  return buffer.readBigInt64BE().toString();
}

const from_bytes = (x, a, t) => {
  var val = 0;
  for (var i = 0; i < x.length; ++i) {        
    val += x[i];        
    if (i < x.length-1) {
      val = (t == 'big' ? val>>8 : val<<8);
    }
  }
  return val;
}

export const to_base58 = (b) => {
  let s = Buffer.from(base58.encode(b));
  return 'z' + s.toString();
}

export const bytes_to_koin = (b64) => {
  let b = ByteBuffer.fromBase64(b64)
  return from_bytes(b.buffer, 1, 'little');
}

export const address_to_bytes = async (address) => {
  let b = Buffer.from(address, 'ascii');
  let length = b.length
  let a = Buffer.from(to_bytes(length, 1, 'big'));
  let result = Buffer.concat([a, b]);
  return result;
}