import { Response } from 'express';

enum ResponseStatusEnum {
  'image-not-found' = 404,
  'image-could-not-be-processed' = 500
}

export function handleRequestError(res: Response, error: Error): void {
  const status: number =
    ResponseStatusEnum[error.message as keyof typeof ResponseStatusEnum] || 500;
  res.status(status).send(error.message);
}
