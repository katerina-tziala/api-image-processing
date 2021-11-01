import * as fs from 'fs';
import { promises as fsAsync } from 'fs';
import sharp, { FormatEnum } from 'sharp';
import { ImageFormat, ImageOptions } from './image.types';
import { generateThumbName } from './utils';

import path from 'path';

const SRC_PATH = path.normalize('./assets/images/src/');
const THUMBS_PATH = path.normalize('./assets/images/thumb/');

export async function getThumbPath(
  options: ImageOptions
): Promise<string | {}> {
  const thumbName = generateThumbName(options);
  const thumbPath = `${THUMBS_PATH}${thumbName}`;
  const thumbExists = imageExists(thumbPath);
  return thumbExists ? thumbPath : createThumb(options, thumbPath);
}

function imageExists(imagePath: string): boolean {
  return fs.existsSync(imagePath);
}

async function getSourceImage(name: string): Promise<string | undefined> {
  const sourceImages = await getImagesList(SRC_PATH);
  return sourceImages.find(srcImage => srcImage.match(name));
}

async function getImagesList(directory = SRC_PATH): Promise<string[]> {
  try {
    const images = await fsAsync.readdir(directory);
    return images;
  } catch {
    return [];
  }
}

async function createThumb(
  options: ImageOptions,
  thumbPath: string
): Promise<string | {}> {
  const srcImage = await getSourceImage(options.name);
  if (!srcImage) {
    throw new Error('image-not-found');
  }

  const srcPath = `${SRC_PATH}${srcImage}`;
  await checkThumbPath();
  return generateThumb(options, srcPath, thumbPath);
}

async function checkThumbPath(): Promise<void> {
  try {
    await fsAsync.access(THUMBS_PATH);
  } catch {
    fsAsync.mkdir(THUMBS_PATH);
  }
}

async function generateThumb(
  options: ImageOptions,
  srcPath: string,
  thumbPath: string
): Promise<string> {
  const { format, flip, flop, rotate, width, height } = options;
  const thumbFormat: keyof FormatEnum =
    ImageFormat[format as keyof typeof ImageFormat];
  const background = { r: 0, g: 0, b: 0, alpha: 0 };
  try {
    await sharp(srcPath)
      .rotate(rotate, { background })
      .flip(flip)
      .flop(flop)
      .resize({ width, height, background })
      .toFormat(thumbFormat)
      .toFile(thumbPath);
    return thumbPath;
  } catch (error) {
    throw new Error('image-could-not-be-processed');
  }
}
