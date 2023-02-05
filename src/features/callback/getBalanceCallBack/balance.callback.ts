import CryptoJS from 'crypto-js';

interface GetBalanceCallbackRequest {
  Method: string;
  balancePackage: string;
  packageId: string;
  dateSent: number;
}

interface BalancePackage {
  ActionId: number;
  SourceName: string;
}

interface GetBalanceCallbackResponse {
  StatusCode: number;
  StatusMessage: string;
  PackageId: string;
  Balance: number;
  DateReceived: number;
  DateSent: number;
}

function GetBalanceCallbackHandler(request: GetBalanceCallbackRequest) {
  const balancePackage = CryptoJS.AES.decrypt(
    request.balancePackage,
    process.env.PARTNERKEY,
  );
  return balancePackage;
}

export type {
  GetBalanceCallbackRequest,
  BalancePackage,
  GetBalanceCallbackResponse,
  GetBalanceCallbackHandler,
};
