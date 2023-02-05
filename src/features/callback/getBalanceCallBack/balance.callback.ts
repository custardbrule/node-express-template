import { DateHelper, StringHelper } from '@server/utils';

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
  const balancePackage = StringHelper.AESDecrypt(
    request.balancePackage,
    process.env.PARTNERKEY,
  );
  const balancePackageObj: BalancePackage = JSON.parse(balancePackage);

  const res: GetBalanceCallbackResponse = {
    StatusCode: 100,
    StatusMessage: balancePackageObj.SourceName,
    PackageId: request.packageId,
    Balance: 1000,
    DateReceived: DateHelper.ToTicks(new Date()),
    DateSent: DateHelper.ToTicks(new Date()),
  };

  return res;
}

export type {
  GetBalanceCallbackRequest,
  BalancePackage,
  GetBalanceCallbackResponse,
};

export { GetBalanceCallbackHandler };
