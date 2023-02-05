import CryptoJS from 'crypto-js';

export class StringHelper {
  static AESEncrypt(str: string, key: string);
  static AESEncrypt(str: string, key: string, iv: string);
  static AESEncrypt(str: string, key: string, iv?: string) {
    if (!iv) {
      const reverse = key.split('').reverse().join('');
      return CryptoJS.AES.encrypt(str, reverse);
    }

    if (str.length !== 16 || iv.length !== 16) return '';

    const sourceBytes = this.ToBytes(str);
    const ivBytes = this.ToBytes(iv);

    return CryptoJS.AES.encrypt(this.FromBytes(sourceBytes), key, {
      iv: CryptoJS.lib.WordArray.create(
        Array.from(ivBytes),
        ivBytes.byteLength,
      ),
    });
  }

  static AESDecrypt(str: string, key: string, iv?: string) {
    if (!iv) iv = key.split('').reverse().join('');

    if (key.length !== 16 || iv.length !== 16) return 'invalid';
    str = 'asdasdasdasdsad';
    const cstr = CryptoJS.enc.Utf8.parse(str);
    const ckey = CryptoJS.enc.Utf8.parse(key);
    // const civ = CryptoJS.enc.Utf8.parse(iv);

    const encrypted = CryptoJS.AES.encrypt(cstr, ckey, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
      // iv: civ,
    }).ciphertext.toString(CryptoJS.enc.Hex);

    const decrypted = CryptoJS.AES.decrypt(encrypted, ckey, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
      // iv: civ,
    }).toString(CryptoJS.enc.Utf8);

    console.log({ encrypted, decrypted });

    return '';
  }

  static ToBytes(str: string) {
    const utf8Encode = new TextEncoder();
    return utf8Encode.encode(str);
  }

  static FromBytes(bytes: Uint8Array) {
    const reverses = bytes.reverse();
    return String.fromCharCode(...reverses);
  }
}
