import request from 'supertest';
import app from '../src/app';
import prisma from '../src/utils/prisma';

// Disable auth for testing
process.env.ENABLE_AUTH = 'false';

describe('Category API', () => {
  afterAll(async () => {
    // Clean up created data
    await prisma.category.deleteMany({});
    await prisma.$disconnect();
  });

  it('should create a new category successfully', async () => {
    const res = await request(app)
      .post('/api/v1/categories')
      .send({ categoryType: 'General' });

    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.categoryType).toBe('General');
  });

  it('should fail to create a category with invalid data', async () => {
    const res = await request(app).post('/api/v1/categories').send({});

    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toBe(false);
  });

  it('should retrieve all categories', async () => {
    await prisma.category.create({ data: { categoryType: 'SC' } });
    await prisma.category.create({ data: { categoryType: 'ST' } });

    const res = await request(app).get('/api/v1/categories');

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    // Including the one created in the first test
    expect(res.body.data.length).toBeGreaterThanOrEqual(2);
  });
}); 