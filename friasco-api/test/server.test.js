const request = require('supertest');
const server = require('../server');

jest.mock('pino', () => () => ({
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
}));

const baseUrl = '/v1';

describe('Server', () => {
  afterAll(async () => {
    server.close();
  });

  it('should return 404 for route that does not exist', async () => {
    const res = await request(server)
      .get('/dksadklalkds')
      .send();

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual('does not exist');
  });

  it('should return 404 for route /api/v1 that does not exist', async () => {
    const res = await request(server)
      .get(baseUrl + '/fklsdklfskl')
      .send();

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual('does not exist');
  });

  it('should not return 404 for route /api/v1 that does exist', async () => {
    const res = await request(server)
      .get(baseUrl+ '/trips')
      .send();

    // Get 500 because no database table initialzed
    expect(res.statusCode).toEqual(500);
  });
});
