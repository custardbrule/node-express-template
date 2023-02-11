import { ValidationError } from 'express-validator';

export default class ResponseModel<T> {
  data?: T;
  errors?: ValidationError[] | Error[];
  message?: string;
  code: number;
  statusCode: number;

  static CreateResponse = (data: any, message?: string) => {
    const model = new ResponseModel<typeof data>();
    model.data = data;
    model.message = message;
    return model;
  };

  static ErrorResponse = (
    errors: ValidationError[] | Error[],
    message?: string,
  ) => {
    const model = new ResponseModel<null>();
    model.errors = errors;
    model.message = message;
    return model;
  };
}
