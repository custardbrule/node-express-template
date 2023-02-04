export class ObjectHelper {
  static AddXmlDeclaration(o: object) {
    let newObj = {};

    (newObj as Record<string, any>)['_declaration'] = {
      _attributes: { version: '1.0', encoding: 'UTF-8' },
    };
    newObj = { ...newObj, ...o };

    return newObj;
  }
}
