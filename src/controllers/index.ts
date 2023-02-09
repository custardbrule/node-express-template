import { Express } from 'express';
import GameLogController from '@server/controllers/gameLog.controller';
import CallbackController from './callback.controller';

function useController(app: Express) {
  app.use(GameLogController);
  app.use(CallbackController);
}

export default useController;
