import fs from 'fs';
import { ImageOptions, ImageFormat } from '../../../modules/images/image.types';
import * as images from '../../../modules/images/index';
import { checkDirectory } from '../../../utilities/utilities.module';
import * as fsHelper from '../../helpers/fs-helper';
import { CONFIG } from '../../../config/config';

const options: ImageOptions = {
  name: 'santamonica',
  format: ImageFormat.png,
  flip: true,
  flop: true,
  rotate: 30,
  width: 200,
  height: 100
};

const fullOptionsName =
  CONFIG.THUMB_IMAGES + 'thumb-santamonica-w200-h100-deg(30)-flip-flop.png';

const removeThumbsDirectory = async () => {
  await fsHelper.clearDirectory(CONFIG.THUMB_IMAGES);
  await fsHelper.removeDirectory(CONFIG.THUMB_IMAGES);
};

describe('Test generateThumb function', () => {
  beforeAll(async (): Promise<void> => removeThumbsDirectory());

  it('rejects the process with image-could-not-be-processed if original image does not exist', async (): Promise<void> => {
    const error = new Error('image-could-not-be-processed');
    await expectAsync(
      images.generateThumb(
        options,
        'assets/images/foo.jpg',
        'assets/images/thumb-foo.jpg'
      )
    ).toBeRejectedWith(error);
  });

  it('rejects the process with image-could-not-be-processed if path for thumb is not correct', async (): Promise<void> => {
    const error = new Error('image-could-not-be-processed');
    await expectAsync(
      images.generateThumb(
        options,
        'assets/images/src/santamonica.jpg',
        'images/thumb-foo.jpg'
      )
    ).toBeRejectedWith(error);
  });

  it('rejects the process with image-could-not-be-processed if thumbs folder does not exist', async (): Promise<void> => {
    const error = new Error('image-could-not-be-processed');
    await expectAsync(
      images.generateThumb(
        options,
        'assets/images/src/santamonica.jpg',
        'images/thumb-foo.jpg'
      )
    ).toBeRejectedWith(error);
  });

  it(`creates the image ${fullOptionsName} correctly with params ${JSON.stringify(
    options
  )}`, async (): Promise<void> => {
    await checkDirectory(CONFIG.THUMB_IMAGES);
    await images.generateThumb(
      options,
      'assets/images/src/santamonica.jpg',
      fullOptionsName
    );
    expect(fs.existsSync(fullOptionsName)).toEqual(true);
  });

  afterAll(async (): Promise<void> => removeThumbsDirectory());
});

describe('Test createThumb function', () => {
  beforeAll(async (): Promise<void> => removeThumbsDirectory());

  it('rejects the process with image-could-not-be-processed if original image does not exist', async (): Promise<void> => {
    const error = new Error('image-not-found');
    const optionsForError: ImageOptions = { ...options };
    optionsForError.name = 'foo';
    await expectAsync(
      images.createThumb(optionsForError, fullOptionsName)
    ).toBeRejectedWith(error);
  });

  it(`creates the image ${fullOptionsName} correctly with params ${JSON.stringify(
    options
  )}`, async (): Promise<void> => {
    await images.createThumb(options, fullOptionsName);
    expect(fs.existsSync(fullOptionsName)).toEqual(true);
  });

  afterAll(async (): Promise<void> => removeThumbsDirectory());
});

describe('Test getThumbPath function', () => {
  beforeAll(async (): Promise<void> => removeThumbsDirectory());

  it(`returns ${fullOptionsName} of the created thumb ${JSON.stringify(
    options
  )}`, async (): Promise<void> => {
    expect(fs.existsSync(fullOptionsName)).toEqual(false);
    const thumbPath = await images.getThumbPath(options);
    expect(thumbPath).toEqual(fullOptionsName);
    expect(fs.existsSync(fullOptionsName)).toEqual(true);
  });

  it(`returns ${fullOptionsName} of the existing thumb ${JSON.stringify(
    options
  )}`, async (): Promise<void> => {
    expect(fs.existsSync(fullOptionsName)).toEqual(true);
    const thumbPath = await images.getThumbPath(options);
    expect(thumbPath).toEqual(fullOptionsName);
  });

  afterAll(async (): Promise<void> => removeThumbsDirectory());
});
