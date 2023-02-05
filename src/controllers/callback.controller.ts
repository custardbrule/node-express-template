import {
  TokenAuthenticationHandler,
  TokenAuthenticationRequest,
} from '@server/features/callback/tokenAuthentication/token.authentication';
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
   *           application/xml:
   *             schema:
   *               type: object
   *               xml:
   *                 name: authenticate
   *               properties:
   *                 member_id:
   *                   type: string
   *                   description: The object's ID.
   *                   example: "0000-0000-0000-0000"
   *                 status_code:
   *                   type: integer
   *                   description: status_code 0 í success other is failed.
   *                   example: 1
   *                 message:
   *                   type: string
   *                   example: "message"
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
