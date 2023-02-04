import {
  TokenAuthenticationHandler,
  TokenAuthenticationRequest,
} from '@server/features/auth/tokenAuthentication/tokenAuthentication';
import { ObjectHelper } from '@server/utils';
import { Express, Response, Request } from 'express';
import convert from 'xml-js';

const CONTROLLERNAME = 'CallBack';

function useCallbackController(app: Express) {
  /**
   * @swagger
   * /CallBack/TokenAuth:
   *   get:
   *     summary: token authentication
   *     description: third party authentication
   *     parameters:
   *       - in: query
   *         name: token
   *         type: string
   *         required: true
   *         description: token to authenticate
   *       - in: query
   *         name: secret_key
   *         type: string
   *         required: true
   *         description: secrect key to authenticate
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
  app.get(
    `/${CONTROLLERNAME}/TokenAuth`,
    async (_req: Request, _res: Response) => {
      const request = new TokenAuthenticationRequest(
        _req.query.token as string,
        _req.query.secret_key as string,
      );

      const data = await TokenAuthenticationHandler(request);
      const xmlRes = ObjectHelper.AddXmlDeclaration(data);

      _res.header('Content-Type', 'text/xml');
      return _res.send(
        convert.js2xml(xmlRes, {
          ignoreDeclaration: false,
          declarationKey: '_declaration',
          compact: true,
          fullTagEmptyElement: true,
        }),
      );
    },
  );

  return app;
}

export default useCallbackController;
