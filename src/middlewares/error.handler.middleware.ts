import { Express, Request, Response, NextFunction } from 'express';
import { ErrorHandlerModel } from '../models';

function applyErrorHandler(app: Express): void {
  app.use(
    (
      _err: ErrorHandlerModel,
      _req: Request,
      _res: Response,
      _next: NextFunction,
    ) => {
      if (_err) _res.status(_err.code || 500).send(_err);
    },
  );
}

export default applyErrorHandler;
