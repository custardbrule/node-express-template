import { Express } from 'express';
import useGameLogController from '@server/controllers/gameLog.controller';
import useCallbackController from './callback.controller';

function useController(app: Express) {
  useGameLogController(app);
  useCallbackController(app);
}

export default useController;
