import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StudentService } from './student.service';

const createStudent = catchAsync(async (req, res) => {
  const result = await StudentService.createStudent(req.body);
  sendResponse(res, httpStatus.CREATED, {
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentService.getAllStudents(req.query);
  sendResponse(res, httpStatus.OK, {
    success: true,
    message: 'Students retrieved successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentService.getSingleStudent(Number(id));
  sendResponse(res, httpStatus.OK, {
    success: true,
    message: 'Student retrieved successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentService.updateStudent(Number(id), req.body);
  sendResponse(res, httpStatus.OK, {
    success: true,
    message: 'Student updated successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentService.deleteStudent(Number(id));
  sendResponse(res, httpStatus.OK, {
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
}; 