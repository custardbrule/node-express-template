import { body } from 'express-validator';

const token_validator = [
  body('client_id')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('clientId is required'),
  body('client_secrect')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('client_secrect is required'),
  body('grant_type')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('grant_type is required'),
  body('audience')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('audience is required'),
];

export { token_validator };
