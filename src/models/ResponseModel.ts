import { ValidationError } from 'express-validator';

interface ErrorDetail {
  [name: string]: string[];
}

export default class ResponseModel<T> {
  data?: T;
  errors?: ErrorDetail[] | ValidationError[];
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
    statusCode: number,
    errors: [string, string[]][],
    message?: string,
  ) => {
    const model = new ResponseModel<null>();
    model.errors = errors.map((e) => {
      return { e: e[1] };
    });
    model.message = message;
    model.statusCode = statusCode;
    return model;
  };

  static ValidationErrorResponses(
    statusCode: number,
    errors: ValidationError[],
    message?: string,
  ) {
    const model = new ResponseModel<null>();
    model.errors = errors;
    model.message = message;
    model.statusCode = statusCode;
    return model;
  }
}
