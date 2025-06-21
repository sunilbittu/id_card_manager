import request from 'supertest';
import app from '../src/app';
import prisma from '../src/utils/prisma';
import { BloodGroup, Category, Course, Institute } from '@prisma/client';

// Disable auth for testing
process.env.ENABLE_AUTH = 'false';

describe('Student API', () => {
  let category: Category;
  let institute: Institute;
  let course: Course;

  beforeAll(async () => {
    // Create dependencies
    category = await prisma.category.create({
      data: { categoryType: 'Test-General' },
    });
    institute = await prisma.institute.create({
      data: { name: 'Test-Institute' },
    });
    course = await prisma.course.create({
      data: {
        courseName: 'Test-Course',
        from: new Date(),
        to: new Date(),
      },
    });
  });

  afterAll(async () => {
    // Clean up all data
    await prisma.student.deleteMany({});
    await prisma.course.deleteMany({});
    await prisma.institute.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.$disconnect();
  });

  it('should create a new student successfully', async () => {
    const res = await request(app)
      .post('/api/v1/students')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@test.com',
        bloodGroup: BloodGroup.A_POS,
        categoryId: category.id,
        instituteId: institute.id,
        courseId: course.id,
        courseDurationFrom: new Date().toISOString(),
        courseDurationTo: new Date().toISOString(),
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.email).toBe('john.doe@test.com');
  });

  it('should fail to create a student with invalid data', async () => {
    const res = await request(app).post('/api/v1/students').send({
      firstName: 'Jane',
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toBe(false);
  });
}); 