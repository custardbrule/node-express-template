import { Express } from 'express';
import GameLogController from '@server/controllers/api/gameLog.controller';
import CallbackController from '@server/controllers/api/callback.controller';
import AuthenticationController from '@server/controllers/oauth/authentication.controller';

function applyController(app: Express) {
  app.use('/api', GameLogController);
  app.use('/api', CallbackController);
  app.use('/oauth', AuthenticationController);
}

export default applyController;
