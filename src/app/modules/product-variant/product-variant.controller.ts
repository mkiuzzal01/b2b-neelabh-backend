// import { Request, RequestHandler, Response } from 'express';
// import catchAsync from '../utils/catchAsync';
// import sendResponse from '../utils/sendResponse';
// import status from 'http-status';
// import { variantService } from './product-variant.service';

// const createProductVariant: RequestHandler = catchAsync(async (req, res) => {
//   const payload = req.body;
//   const result = await variantService.createVariantIntoDB(payload);
//   sendResponse(res, {
//     statusCode: status.OK,
//     message: 'Variant created successfully',
//     success: true,
//     data: result,
//   });
// });

// const allProductVariant: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
//     const { query } = req;
//     const result = await variantService.allVariantFromDB(query);
//     sendResponse(res, {
//       statusCode: status.OK,
//       message: 'Variant retrieve successfully',
//       success: true,
//       data: result,
//     });
//   },
// );

// const singleProductVariant: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
//     const { slug } = req.params;
//     const result = await variantService.getVariantByNameFromDB(slug);
//     sendResponse(res, {
//       statusCode: status.OK,
//       message: 'Single variant updated successfully',
//       success: true,
//       data: result,
//     });
//   },
// );

// const updateSingleProductVariant: RequestHandler = async () => {
//   // const { slug } = req.params;
//   // const data = req.body;
//   // const result = await variantService.updateVariantIntoDB(slug, data);
//   // sendResponse(res, {
//   //   statusCode: status.OK,
//   //   success: true,
//   //   message: 'The product updated successfully',
//   //   data: result,
//   // });
// };

// const deleteSingleProductVariant: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
//     const id = req.params.id;
//     const result = await variantService.deleteVariantFromDB(id);
//     sendResponse(res, {
//       statusCode: status.OK,
//       success: true,
//       message: 'The product variant deleted successfully',
//       data: result,
//     });
//   },
// );

// export const productVariantController = {
//   createProductVariant,
//   allProductVariant,
//   singleProductVariant,
//   updateSingleProductVariant,
//   deleteSingleProductVariant,
// };
