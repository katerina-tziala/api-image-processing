import supertest from 'supertest';

import app from '../../index';
import routes from '../../routes/index';
app.use(routes);

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test API endpoints', () => {
  it('gets the endpoint: /api/', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
