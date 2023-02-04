import { gameLogRepository } from '@server/repositories';
import { ValidationChain, body } from 'express-validator';

class GetGameLogRequest {
  size: number;
  page: number;
  userId: string;

  constructor(userId: string, page: number, size: number) {
    this.userId = userId;
    this.page = page;
    this.size = size;
  }
}

const GetGameLogRequestValidator = (): ValidationChain[] => {
  return [
    body('userId')
      .notEmpty({ ignore_whitespace: true })
      .withMessage('User id is required')
      .isUUID()
      .withMessage('User id is invalid'),
    body('page')
      .notEmpty()
      .withMessage('Page number is required')
      .isInt({ min: 1 }),
    body('size')
      .notEmpty()
      .withMessage('Page size is required')
      .isInt({ min: 1, max: 100 })
      .withMessage('Page size allowance is between 1 and 100'),
  ];
};

async function GetGameLogRequestHandler(request: GetGameLogRequest) {
  const options = {
    page: request.page,
    limit: request.size,
    collation: {
      locale: 'en',
    },
  };

  const pageData = await gameLogRepository.paginate(
    { user_id: request.userId },
    options,
  );

  return pageData;
}

export {
  GetGameLogRequest,
  GetGameLogRequestHandler,
  GetGameLogRequestValidator,
};
