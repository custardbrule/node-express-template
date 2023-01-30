import { Express } from 'express';
import useGameLogController from './gameLog.controller';

function useController(app: Express) {
  useGameLogController(app);
}

export default useController;
