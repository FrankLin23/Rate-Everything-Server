export interface ResOp {
  data?: any;
  code?: number;
  message?: string;
}

export const ErrorConstants = {};

export function response(option?: ResOp): ResOp {
  return {
    data: option?.data ?? null,
    code: option?.code ?? 200,
    message: option?.code
      ? getErrorMessageByCode(option!.code) ||
        option?.message ||
        'unknown error'
      : option?.message || 'success',
  };
}

export function getErrorMessageByCode(code: number): string {
  return ErrorConstants[code];
}
