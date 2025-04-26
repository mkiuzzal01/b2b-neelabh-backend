import { Request, RequestHandler, Response } from 'express';

export const createAdmin: RequestHandler = async (
  req: Request,
  res: Response,
) => {};

export const createProductionManager: RequestHandler = async (
  req: Request,
  res: Response,
) => {};

export const createAccountant: RequestHandler = async (
  req: Request,
  res: Response,
) => {};
export const createSeller: RequestHandler = async (
  req: Request,
  res: Response,
) => {};

export const userController = {
  createAdmin,
  createProductionManager,
  createAccountant,
  createSeller,
};
