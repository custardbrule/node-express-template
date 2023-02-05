class TokenAuthenticationRequest {
  token: string;
  secret_key: string;

  constructor(token: string, secret_key: string) {
    this.token = token;
    this.secret_key = secret_key;
  }
}

class AuthenticateTokenResponse {
  authenticate: {
    member_id?: string;
    status_code: number;
    message: string;
  };

  static SucessResponse(member_id: string) {
    const res = new AuthenticateTokenResponse();
    res.authenticate = {
      member_id: member_id,
      status_code: 0,
      message: 'Success',
    };

    return res;
  }

  static FailResponse() {
    const res = new AuthenticateTokenResponse();
    res.authenticate = {
      member_id: '',
      status_code: 1,
      message: 'Failed',
    };

    return res;
  }
}

async function TokenAuthenticationHandler(request: TokenAuthenticationRequest) {
  console.log(request);

  return AuthenticateTokenResponse.FailResponse();
}

export { TokenAuthenticationRequest, TokenAuthenticationHandler };
