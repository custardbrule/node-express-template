class ErrorHandlerModel extends Error {
  code: number;
  errors: [string, string[]][];
  constructor(code: number, errors?: [string, string[]][]) {
    super(errors?.join('\n'));
    this.code = code;
    this.errors = [...(errors ?? [])];
  }
}

export default ErrorHandlerModel;
