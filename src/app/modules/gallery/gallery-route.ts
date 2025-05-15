import { NextFunction, Request, Response, Router } from 'express';
import { galleryController } from './gallery-controller';
import { auth } from '../../middlewares/auth';
import { ACCESS_ROLE } from '../../interface/AccessRole';
import { upload } from '../../utils/sendImageToCloudinary';

const route = Router();

//this is folder:
route.get('/all-folder', galleryController.allFolder);
route.get('/single-folder/:id', galleryController.singleFolder);
route.post('/create-folder', galleryController.createFolder);
route.patch('/update-folder/:id', galleryController.updateFolder);
route.delete('/delete-folder/:id', galleryController.deleteFolder);

//this is photo route:

route.get('/all-photo', galleryController.allPhoto);
route.get('/single-photo/:id', galleryController.singlePhoto);
route.post(
  '/create-photo',
  auth(ACCESS_ROLE.SUPER_ADMIN, ACCESS_ROLE.ADMIN),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  galleryController.createPhoto,
);
route.patch(
  '/update-photo/:id',
  auth(ACCESS_ROLE.SUPER_ADMIN, ACCESS_ROLE.ADMIN),
  galleryController.updatePhoto,
);
route.delete(
  '/delete-photo/:id',
  auth(ACCESS_ROLE.SUPER_ADMIN, ACCESS_ROLE.ADMIN),
  galleryController.deletePhoto,
);

export const galleryRouter = route;
