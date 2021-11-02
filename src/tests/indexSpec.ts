import supertest from 'supertest';

import app from '../index';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test endpoints', () => {
  it('gets the endpoint: /', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/');
    expect(response.status).toBe(200);
  });

  it('gets the api endpoint: /api', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/api');
    expect(response.status).toBe(200);
  });

  it('returns 404 for invalid endpoint: /foo', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/foo');
    expect(response.status).toBe(404);
  });
});
