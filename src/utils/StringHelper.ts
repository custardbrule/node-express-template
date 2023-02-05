export class StringHelper {
  static ToBytes(str: string) {
    const utf8Encode = new TextEncoder();
    return utf8Encode.encode(str);
  }

  static FromBytes(bytes: Uint8Array) {
    return String.fromCharCode(...bytes);
  }
}
