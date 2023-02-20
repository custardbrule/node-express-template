import { Express, Request, Response, NextFunction } from 'express';
import { ErrorHandlerModel, ResponseModel } from '../models';

function applyErrorHandler(app: Express): void {
  app.use(
    (
      _err: ErrorHandlerModel,
      _req: Request,
      _res: Response,
      _next: NextFunction,
    ) => {
      if (_err instanceof ErrorHandlerModel) {
        const res = ResponseModel.ErrorResponse(_err.code, _err.errors);
        _res.status(res.statusCode || 500).send(res);
      }
      if (_err) _res.status(_err.code || 500).send(_err);
      _next();
    },
  );
}

export default applyErrorHandler;
