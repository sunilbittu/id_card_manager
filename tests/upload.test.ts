import request from 'supertest';
import app from '../src/app';
import path from 'path';
import fs from 'fs';

// Disable auth for testing
process.env.ENABLE_AUTH = 'false';

describe('Upload API', () => {
  const testImagePath = path.join(__dirname, 'test-image.png');

  beforeAll(() => {
    // Create a dummy image file for testing
    if (!fs.existsSync(testImagePath)) {
      fs.writeFileSync(testImagePath, 'fake image data');
    }
  });

  afterAll(() => {
    // Clean up the dummy image file
    if (fs.existsSync(testImagePath)) {
      fs.unlinkSync(testImagePath);
    }
    // Also clean up uploads folder
    const uploadPath = path.join(process.cwd(), 'uploads');
    if (fs.existsSync(uploadPath)) {
      fs.rmSync(uploadPath, { recursive: true, force: true });
    }
  });

  it('should upload a photo successfully', async () => {
    const res = await request(app)
      .post('/api/v1/upload/photo')
      .attach('photo', testImagePath);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('url');
    expect(res.body.data.url).toMatch(/\/uploads\/photo-/);
  });

  it('should fail to upload a non-image file', async () => {
    const testFilePath = path.join(__dirname, 'test-file.txt');
    fs.writeFileSync(testFilePath, 'some text');

    const res = await request(app)
      .post('/api/v1/upload/photo')
      .attach('photo', testFilePath);

    fs.unlinkSync(testFilePath); // clean up

    expect(res.statusCode).toEqual(500); // Multer error is not handled as a client error yet
    expect(res.body.success).toBe(false);
  });
}); 