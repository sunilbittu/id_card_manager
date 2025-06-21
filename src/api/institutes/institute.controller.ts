import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { InstituteService } from './institute.service';

const createInstitute = catchAsync(async (req, res) => {
  const result = await InstituteService.createInstitute(req.body);
  sendResponse(res, httpStatus.CREATED, {
    success: true,
    message: 'Institute created successfully',
    data: result,
  });
});

const getAllInstitutes = catchAsync(async (req, res) => {
  const result = await InstituteService.getAllInstitutes();
  sendResponse(res, httpStatus.OK, {
    success: true,
    message: 'Institutes retrieved successfully',
    data: result,
  });
});

const getSingleInstitute = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await InstituteService.getSingleInstitute(Number(id));
  sendResponse(res, httpStatus.OK, {
    success: true,
    message: 'Institute retrieved successfully',
    data: result,
  });
});

const updateInstitute = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await InstituteService.updateInstitute(Number(id), req.body);
  sendResponse(res, httpStatus.OK, {
    success: true,
    message: 'Institute updated successfully',
    data: result,
  });
});

const deleteInstitute = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await InstituteService.deleteInstitute(Number(id));
  sendResponse(res, httpStatus.OK, {
    success: true,
    message: 'Institute deleted successfully',
    data: result,
  });
});

export const InstituteController = {
  createInstitute,
  getAllInstitutes,
  getSingleInstitute,
  updateInstitute,
  deleteInstitute,
}; 