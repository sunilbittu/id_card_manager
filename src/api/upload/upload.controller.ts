import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const uploadPhoto = catchAsync(async (req, res) => {
  if (!req.file) {
    return sendResponse(res, httpStatus.BAD_REQUEST, {
      success: false,
      message: 'No file uploaded',
      data: null,
    });
  }

  // Construct the public URL
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  sendResponse(res, httpStatus.OK, {
    success: true,
    message: 'File uploaded successfully',
    data: {
      url: fileUrl,
    },
  });
});

export const UploadController = {
  uploadPhoto,
}; 