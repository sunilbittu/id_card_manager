import request from 'supertest';
import app from '../src/app';
import prisma from '../src/utils/prisma';

// Disable auth for testing
process.env.ENABLE_AUTH = 'false';

describe('Institute API', () => {
  afterAll(async () => {
    // Clean up created data
    await prisma.institute.deleteMany({});
    await prisma.$disconnect();
  });

  it('should create a new institute successfully', async () => {
    const res = await request(app)
      .post('/api/v1/institutes')
      .send({ name: 'Global Tech Institute' });

    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.name).toBe('Global Tech Institute');
  });

  it('should fail to create an institute with invalid data', async () => {
    const res = await request(app).post('/api/v1/institutes').send({});

    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toBe(false);
  });

  it('should retrieve all institutes', async () => {
    await prisma.institute.create({ data: { name: 'State College' } });
    await prisma.institute.create({ data: { name: 'City University' } });

    const res = await request(app).get('/api/v1/institutes');

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(2);
  });
}); 