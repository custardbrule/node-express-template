class ErrorHandlerModel extends Error {
  code: number;
  errors: [any];
  constructor(message: string, code: number, errors?: [any]) {
    super(message);
    this.code = code;
    this.errors = errors;
  }
}

export default ErrorHandlerModel;
