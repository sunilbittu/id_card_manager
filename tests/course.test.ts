import request from 'supertest';
import app from '../src/app';
import prisma from '../src/utils/prisma';

// Disable auth for testing
process.env.ENABLE_AUTH = 'false';

describe('Course API', () => {
  afterAll(async () => {
    // Clean up created data
    await prisma.course.deleteMany({});
    await prisma.$disconnect();
  });

  it('should create a new course successfully', async () => {
    const res = await request(app)
      .post('/api/v1/courses')
      .send({
        courseName: 'Advanced TypeScript',
        from: '2024-01-01T00:00:00.000Z',
        to: '2024-12-31T00:00:00.000Z',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.courseName).toBe('Advanced TypeScript');
  });

  it('should fail to create a course with invalid data', async () => {
    const res = await request(app).post('/api/v1/courses').send({
      courseName: 'Incomplete Course',
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toBe(false);
  });

  it('should retrieve all courses', async () => {
    await prisma.course.create({
      data: {
        courseName: 'Intro to Prisma',
        from: '2024-01-01T00:00:00.000Z',
        to: '2024-06-30T00:00:00.000Z',
      },
    });

    const res = await request(app).get('/api/v1/courses');

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
  });
}); 