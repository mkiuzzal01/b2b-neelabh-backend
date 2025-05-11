import { Router } from 'express';
import { galleryController } from './gallery-controller';

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
route.post('/create-photo', galleryController.createPhoto);
route.patch('/update-photo/:id', galleryController.updatePhoto);
route.delete('/delete-photo/:id', galleryController.deletePhoto);

export const galleryRouter = route;
