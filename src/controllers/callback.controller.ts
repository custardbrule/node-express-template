import { GetBalanceCallbackHandler } from '@server/features/callback/getBalanceCallBack/balance.callback';
import {
  TokenAuthenticationHandler,
  TokenAuthenticationRequest,
} from '@server/features/callback/tokenAuthentication/token.authentication';
import { ObjectHelper } from '@server/utils';
import { Router } from 'express';
import { Response, Request } from 'express';
import convert from 'xml-js';

const CONTROLLERNAME = 'CallBack';

const router = Router();

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
router.get(
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

/**
 * @swagger
 * /CallBack/GetBalance:
 *   get:
 *     summary: get balance callback
 *     description: third party callback
 *     parameters:
 *       - in: query
 *         name: Method
 *         type: string
 *         required: true
 *       - in: query
 *         name: balancePackage
 *         type: string
 *         required: true
 *       - in: query
 *         name: packageId
 *         type: string
 *         required: true
 *       - in: query
 *         name: dateSent
 *         type: integer
 *         required: true
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 StatusCode:
 *                   type: string
 *                   description: only 100 is success.
 *                   example: "100"
 *                 StatusMessage:
 *                   type: string
 *                   description: smessage.
 *                   example: "message"
 *                 PackageId:
 *                   type: string
 *                   example: "PackageId"
 *                 Balance:
 *                   type: integer
 *                   example: 1000
 *                 DateReceived:
 *                   type: integer
 *                   example: 100000
 *                 DateSent:
 *                   type: integer
 *                   example: 100000
 */
router.get(
  `/${CONTROLLERNAME}/GetBalance`,
  async (_req: Request, _res: Response) => {
    console.log(_req.query);

    const result = GetBalanceCallbackHandler(_req.query as any);
    return _res.send(result);
  },
);

export default router;
