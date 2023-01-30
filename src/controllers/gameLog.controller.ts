import { Express } from 'express';

const CONTROLLERNAME = 'GameLog';

function useGameLogController(app: Express) {
  app.get(`/${CONTROLLERNAME}`, (_req, _res) => {
    _res.send('game log');
  });

  return app;
}

export default useGameLogController;
