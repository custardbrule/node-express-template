import { GetGameLogRequestHandler } from '@server/@features/game.log/queries/getGameLog.query';
import { Express } from 'express';

const CONTROLLERNAME = 'GameLog';

function useGameLogController(app: Express) {
  /**
   * @swagger
   * /GameLog:
   *   post:
   *     summary: Retrieve a list of JSONPlaceholder users
   *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               userId:
   *                 type: string
   *                 description: The user's id.
   *                 example: "0000-0000-0000-0000"
   *               pageNumber:
   *                 type: number
   *                 example: 1
   *               pageSize:
   *                 type: number
   *                 example: 1
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: object
   *                   properties:
   *                     _id:
   *                       type: string
   *                       description: The object's ID.
   *                       example: "0000-0000-0000-0000"
   *                     user_id:
   *                       type: string
   *                       description: The user's id.
   *                       example: "0000-0000-0000-0000"
   *                     title:
   *                       type: string
   *                       example: "title"
   */
  app.post(`/${CONTROLLERNAME}`, async (_req, _res) => {
    const data = await GetGameLogRequestHandler(_req.body);
    _res.send(data);
  });

  return app;
}

export default useGameLogController;
