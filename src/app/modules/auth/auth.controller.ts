import status from 'http-status';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  console.log(req.user);
  const data = req.body;
  const result = await AuthServices.loginUserIntoDB(data);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'user is logged  in successfully',
    data: result,
  });
});

export const AuthController = {
  loginUser,
};
