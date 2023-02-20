import {
  GrantClientCredentials,
  ValidateClientCredentials,
  token_grant_validator,
  token_validator,
} from '@server/features/oauth/token/token.oauth';
import { ValidateParallel } from '@server/features/common';
import { Router, Request, Response } from 'express';
import { ResponseModel } from '@server/models';

const CONTROLLERNAME = 'Authentication';

const router = Router();

router.get(`/${CONTROLLERNAME}/login`, (req: Request, res: Response) => {
  const loginProvider = req.query.loginProvider;
  const redirectUrl = req.query.redirectUrl;
  return res.render('./authentication/login', {
    title: 'login',
    loginProvider,
    redirectUrl,
  });
});

router.post(`/${CONTROLLERNAME}/login`, (req: Request, res: Response) => {
  return res.send(req.body);
});

router.post(
  `/token`,
  ValidateParallel(token_grant_validator),
  async (req: Request, res: Response) => {
    const token = await GrantClientCredentials(req.body);
    return res.send(ResponseModel.CreateResponse({ access_token: token }));
  },
);

router.get(
  `/token`,
  ValidateParallel(token_validator),
  async (req: Request, res: Response) => {
    const auth = await ValidateClientCredentials(req.query.token as string);
    return auth
      ? res.redirect(req.query.redirectUrl as string)
      : res.redirect(`/oauth/${CONTROLLERNAME}/login`);
  },
);

export default router;
