// import base58 from 'bs58';
// import base64 from 'base-64';
// import base58 from 'bs58';
// import base64 from 'base-64';

export const to_bytes = (x, a, t) => {
  var bytes = [];
  let i = a
  do {
    bytes[--i] = x & (255);
    x = (t == 'big' ? x>>8 : x<<8);
  } while ( i )
  return bytes;
}

export const to_base58 = (b) => {
  let s = Buffer.from(base58.encode(b));
  return 'z' + s.toString();
}

export const bytes_to_koin = (b) => {
  console.log(base64.decode(result))
  return;
}

export const address_to_bytes = async (address) => {
  let b = Buffer.from(address, 'ascii');
  let length = b.length
  let a = Buffer.from(to_bytes(length, 1, 'big'));
  let result = Buffer.concat([a, b]);
  return result;
}