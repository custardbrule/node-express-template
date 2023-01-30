import { Express } from 'express';
import useGameLogController from '@server/controllers/gameLog.controller';

function useController(app: Express) {
  useGameLogController(app);
}

export default useController;
