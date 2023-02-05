import CryptoJS from 'crypto-js';

export class StringHelper {
  static AESEncrypt(str: string, key: string);
  static AESEncrypt(str: string, key: string, iv: string);
  static AESEncrypt(str: string, key: string, iv?: string) {
    if (!iv) iv = key.split('').reverse().join('');
    if (key.length !== 16 || iv.length !== 16) return '';

    const ckey = CryptoJS.enc.Utf8.parse(key);
    const civ = CryptoJS.enc.Utf8.parse(iv);

    const encrypted = CryptoJS.AES.encrypt(str, ckey, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: civ,
    });

    console.log(
      'encrypted',
      encrypted.ciphertext.toString(CryptoJS.enc.Base64),
    );

    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  }

  static AESDecrypt(str: string, key: string);
  static AESDecrypt(str: string, key: string, iv: string);
  static AESDecrypt(str: string, key: string, iv?: string) {
    if (!iv) iv = key.split('').reverse().join('');
    if (key.length !== 16 || iv.length !== 16) return 'invalid';

    const cstr = CryptoJS.enc.Base64.parse(str);
    const ckey = CryptoJS.enc.Utf8.parse(key);
    const civ = CryptoJS.enc.Utf8.parse(iv);

    const decrypted = CryptoJS.AES.decrypt({ ciphertext: cstr } as any, ckey, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: civ,
    }).toString(CryptoJS.enc.Utf8);

    return decrypted;
  }

  static ToBytes(str: string) {
    const utf8Encode = new TextEncoder();
    return utf8Encode.encode(str);
  }

  static FromBytes(bytes: Uint8Array) {
    return String.fromCharCode(...bytes);
  }
}
