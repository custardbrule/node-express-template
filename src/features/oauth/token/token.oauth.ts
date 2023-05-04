import { ErrorHandlerModel } from '@server/models';
import { ClientRepository, TokenRepository } from '@server/repositories';
import { body, query } from 'express-validator';
import mongoose from 'mongoose';
import * as jose from 'jose';
import { ClientModel, TokenModel } from '@server/repositories/schemas';
import { DateTime } from 'luxon';
import { CreateJWT, ValidateJWT } from '@server/services/jwt.service';

interface IClientCredentials {
  client_id: string;
  client_secrect: string;
  grant_type: string;
  audience: string;
}

const token_grant_validator = [
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

async function GrantClientCredentials(model: IClientCredentials) {
  const client = await ClientRepository.findOne({
    client_Id: model.client_id,
    client_Secrect: model.client_secrect,
    grant_type: { $in: model.grant_type },
    audience: { $in: model.audience },
  }).exec();

  if (client)
    throw new ErrorHandlerModel(404, [
      ['Not found', ['No client with specify requirement']],
    ]);

  return HandleGrandType(client, model.grant_type);
}

async function HandleGrandType(
  client: mongoose.HydratedDocument<ClientModel>,
  grant_type: string,
) {
  switch (grant_type) {
    case 'client_credentials': {
      const claims = await TokenRepository.create<TokenModel>({
        client_Id: client.id,
        payload: {
          iat: DateTime.now().toSeconds(),
          aud: client.audience,
          iss: process.env.JWT_ISSUER,
          sub: client.id,
          exp: DateTime.now().plus({ hours: 2 }).toSeconds(),
          gty: 'client_credentials',
        },
      });
      const payload: jose.JWTPayload = { ...claims.payload, jti: claims.id };
      const token = await CreateJWT(payload, process.env.JWT_SECRET);
      return token;
    }

    default:
      throw new ErrorHandlerModel(400, [
        ['Invalid grant_type', ['Not support current grant_type']],
      ]);
  }
}

const token_validator = [
  query('token')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('token is required.'),
  query('redirectUrl')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('redirectUrl is required.'),
];

async function ValidateClientCredentials(token: string) {
  const claims = await ValidateJWT(
    token,
    { issuer: process.env.JWT_ISSUER },
    process.env.JWT_SECRET,
  );

  const client = await ClientRepository.findById(claims.payload.sub).exec();
  if (!client) throw new ErrorHandlerModel(404, [['sub', ['Invalid value']]]);

  const errors: [string, string[]][] = [] as [string, string[]][];
  if (claims.payload.exp) {
    const isExpired =
      DateTime.fromSeconds(claims.payload.exp).diffNow().toMillis() >= 0;
    if (isExpired) errors.push(['exp', ['Token has expired']]);
  } else errors.push(['exp', ['exp claim not found']]);

  if (claims.payload.aud) {
    const isAudiencesValid = (client.audience.filter((value) =>
      claims.payload.aud.includes(value),
    ).length = 0);
    if (!isAudiencesValid) errors.push(['aud', ['Invalid audiences']]);
  } else errors.push(['aud', ['aud claim not found']]);

  if (errors.length > 0) throw new ErrorHandlerModel(400, errors);
  return true;
}

export type { IClientCredentials };
export {
  GrantClientCredentials,
  token_validator,
  ValidateClientCredentials,
  token_grant_validator,
};
