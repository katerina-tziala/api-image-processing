import { Request } from 'express';
import { ImageFormat, ImageOptions } from './image.types';

function getDimensionsExtension(
  width: number | undefined,
  height: number | undefined
): string {
  const extensionParts: string[] = [];
  if (width) {
    extensionParts.push(`w${width}`);
  }
  if (height) {
    extensionParts.push(`h${height}`);
  }
  return mapExtensionParts(extensionParts);
}

function getTransformationExtension(flip: boolean, flop: boolean): string {
  const extensionParts: string[] = [];
  if (flip) {
    extensionParts.push('flip');
  }
  if (flop) {
    extensionParts.push('flop');
  }
  return mapExtensionParts(extensionParts);
}

function mapExtensionParts(extensionParts: string[]): string {
  return extensionParts.length ? `-${extensionParts.join('-')}` : '';
}

function getImageFormat(formatType: string): ImageFormat {
  return ImageFormat[formatType as keyof typeof ImageFormat];
}

export function generateThumbName(options: ImageOptions): string {
  const dimensionsExtension = getDimensionsExtension(
    options.width,
    options.height
  );
  const rotationExtension = options.rotate ? `-deg(${options.rotate})` : '';
  const transformationExtension = getTransformationExtension(
    options.flip,
    options.flop
  );
  return `thumb-${options.name}${dimensionsExtension}${rotationExtension}${transformationExtension}.${options.format}`;
}

export function getImageOptionsFromQuery(req: Request): ImageOptions {
  const name = req.query.name as unknown as string;
  const format = getImageFormat(req.query.format as unknown as string);
  const width = getDimension(req.query.width as unknown as string);
  const height = getDimension(req.query.height as unknown as string);
  const rotate = getRotationDegrees(req.query.rotate as unknown as string);
  return {
    name,
    format,
    width,
    height,
    flop: !!req.query.flop,
    flip: !!req.query.flip,
    rotate
  };
}

export function getRotationDegrees(rotate: string | undefined): number {
  return !rotate?.length ? 0 : parseInt(rotate) || 0;
}

export function getDimension(value: string | undefined): number | undefined {
  return !value?.length ? undefined : parseInt(value) || undefined;
}
