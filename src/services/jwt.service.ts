import * as jose from 'jose';

async function CreateJWT(payload: jose.JWTPayload, secrect_key: string) {
  const secret = new TextEncoder().encode(secrect_key);

  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .sign(secret);

  return jwt;
}

async function ValidateJWT(
  token: string,
  options: jose.JWTDecryptOptions,
  secrect_key: string,
) {
  const secret = jose.base64url.decode(secrect_key);
  const { payload, protectedHeader } = await jose.jwtDecrypt(
    token,
    secret,
    options,
  );

  return { payload, protectedHeader };
}

export { CreateJWT, ValidateJWT };
