import { Request, Response } from 'express';
import { ImageFormat, getDimension } from '../modules/images/images.module';
import { CONFIG } from '../config/config';

const MIN_IMAGE_DIMENSION = CONFIG.MIN_IMAGE_DIMENSION;
const MAX_IMAGE_DIMENSION = CONFIG.MAX_IMAGE_DIMENSION;

export function imageOptionsValidator(
  req: Request,
  res: Response,
  next: Function
): void {
  const name = req.query.name as unknown as string;
  const format = req.query.format as unknown as string;
  const invalidParams = checkRequiredParams(name, format);

  if (invalidParams.length) {
    sendInvalidParamsResponse(res, invalidParams);
    return;
  }

  const width = getDimension(req.query.width as unknown as string);
  const height = getDimension(req.query.height as unknown as string);
  const invalidDimensions = checkDimensions(width, height);

  if (invalidDimensions.length) {
    sendInvalidParamsResponse(res, invalidDimensions);
    return;
  }

  next();
}

function sendInvalidParamsResponse(
  res: Response,
  invalidParams: string[]
): void {
  res.status(400).send(invalidParams.join(', '));
}

function checkRequiredParams(
  name: string | undefined,
  format: string | undefined
): string[] {
  const invalidParams: string[] = [];

  if (!name?.length) {
    invalidParams.push('image name must be defined');
  }

  const allowedFormats: string[] = Object.keys(ImageFormat);
  if (!format || !allowedFormats.includes(format)) {
    invalidParams.push(`format must be one of: ${allowedFormats.join(', ')}`);
  }

  return invalidParams;
}

function checkDimensions(
  width: number | undefined,
  height: number | undefined
): string[] {
  const invalidParams: string[] = [];
  if (!imageDimensionValid(width)) {
    invalidParams.push(
      `image width must be greater than ${MIN_IMAGE_DIMENSION} and less than ${MAX_IMAGE_DIMENSION}`
    );
  }
  if (!imageDimensionValid(height)) {
    invalidParams.push(
      `image height must be greater than ${MIN_IMAGE_DIMENSION} and less than ${MAX_IMAGE_DIMENSION}`
    );
  }
  return invalidParams;
}

function imageDimensionValid(value: number | undefined): boolean {
  if (!value) {
    return true;
  }
  return MIN_IMAGE_DIMENSION <= value && value <= MAX_IMAGE_DIMENSION;
}
