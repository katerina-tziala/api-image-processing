import supertest from 'supertest';
import * as fsHelper from '../../helpers/fs-helper';

import app from '../../../index';
import routes from '../../../routes/index';
import { CONFIG } from '../../../config/config';
app.use(routes);

const request: supertest.SuperTest<supertest.Test> = supertest(app);

const ENDPOINT_BASE = '/api/images';
const ENDPOINT_WITH_EXISTING_IMAGE_NAME = `${ENDPOINT_BASE}?name=santamonica`;

const clearThumbs = async () => {
  await fsHelper.clearDirectory(CONFIG.THUMB_IMAGES);
  await fsHelper.removeDirectory(CONFIG.THUMB_IMAGES);
};

describe('Test the query parameters in the images endpoint /api/images:', () => {
  // Test required parameters name and format
  describe('Test the name and format query parameters for the endpoint: ', () => {
    const paramsValidations = {
      definedName: 'image name must be defined',
      allowedFormats:
        'format must be one of: gif, heif, jpeg, jpg, png, svg, tiff, webp'
    };

    it('returns an error when there are no query parameters in the endpoint', async (): Promise<void> => {
      const response: supertest.Response = await request.get(ENDPOINT_BASE);
      expect(response.status).toBe(400);
    });

    it(`returns an error that ${paramsValidations.definedName} in the query parameters`, async (): Promise<void> => {
      const response: supertest.Response = await request.get(ENDPOINT_BASE);
      expect(response.status).toBe(400);
      expect(response.text).toMatch(paramsValidations.definedName);
    });

    it(`returns an error that image ${paramsValidations.allowedFormats} in the query parameters`, async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        `${ENDPOINT_WITH_EXISTING_IMAGE_NAME}&format=foo`
      );
      expect(response.status).toBe(400);
      expect(response.text).toEqual(paramsValidations.allowedFormats);
    });
  });

  // Test optional parameters width and height
  describe('Test the width and height in the query parameters for the endpoint: ', () => {
    it('returns an error when the image height is specified but not in the allowed range', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        `${ENDPOINT_WITH_EXISTING_IMAGE_NAME}&format=png&height=30000`
      );
      expect(response.status).toBe(400);
      expect(response.text).toMatch(
        'image height must be greater than 20 and less than 4000'
      );
    });

    it('returns an error when the image width is specified but not in the allowed range', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        `${ENDPOINT_WITH_EXISTING_IMAGE_NAME}&format=png&height=300&width=30000`
      );
      expect(response.status).toBe(400);
      expect(response.text).toMatch(
        'image width must be greater than 20 and less than 4000'
      );
    });
  });
});

describe('Test the image transformation of the endpoint /api/images:', () => {
  beforeAll(async (): Promise<void> => clearThumbs());

  const imageResizing = `${ENDPOINT_WITH_EXISTING_IMAGE_NAME}&format=jpg&width=200&height=200`;
  const imageFlip = `${ENDPOINT_WITH_EXISTING_IMAGE_NAME}&format=jpg&flip=true`;
  const resizeFlipRotateToPNG = `${ENDPOINT_WITH_EXISTING_IMAGE_NAME}&format=png&flip=true&rotate=20&width=200`;
  const imageNotExisting = `${ENDPOINT_BASE}?name=foo&format=jpg`;

  it(`${imageNotExisting} returns a 404 error when the image does not exist`, async (): Promise<void> => {
    const response: supertest.Response = await request.get(imageNotExisting);
    expect(response.status).toBe(404);
  });

  it(`${imageResizing} returns the resized image`, async (): Promise<void> => {
    const response: supertest.Response = await request.get(imageResizing);
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toBe('image/jpeg');
  });

  it(`${imageFlip} returns the original image flipped`, async (): Promise<void> => {
    const response: supertest.Response = await request.get(imageFlip);
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toBe('image/jpeg');
  });

  it(`${resizeFlipRotateToPNG} returns a png of the original image resized and rotated`, async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      resizeFlipRotateToPNG
    );
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toBe('image/png');
  });

  afterAll(async (): Promise<void> => clearThumbs());
});
