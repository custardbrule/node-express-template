import { ValidateParallel } from '@server/features/common';
import {
  GetGameLogRequestHandler,
  GetGameLogRequestValidator,
} from '@server/features/game-log/queries/getGameLog.query';
import { ResponseModel } from '@server/models';
import { Request, Response, Router } from 'express';

const CONTROLLERNAME = 'GameLog';

const router = Router();

/**
 * @swagger
 * /api/GameLog:
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
 *                 example: "63b45eb4-5cea-403d-8f41-24b4ed2b79c7"
 *               page:
 *                 type: number
 *                 example: 1
 *               size:
 *                 type: number
 *                 example: 10
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
router.post(
  `/${CONTROLLERNAME}`,
  ValidateParallel(GetGameLogRequestValidator()),
  async (_req: Request, _res: Response) => {
    const data = await GetGameLogRequestHandler(_req.body);
    const r = ResponseModel.CreateResponse(data);
    return _res.send(r);
  },
);

export default router;
