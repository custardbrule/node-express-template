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

export default router;
