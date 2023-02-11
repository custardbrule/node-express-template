import { token_validator } from '@server/features/oauth/token/token.oauth';
import { ValidateParallel } from '@server/features/common';
import { Router, Request, Response } from 'express';

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
  `/oauth/token`,
  ValidateParallel(token_validator),
  (req: Request, res: Response) => {
    return res.send(req.body);
  },
);

export default router;
