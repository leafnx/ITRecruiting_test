import { Main } from '../controllers/main'
import { PhotoActions } from '../controllers/photo'
const main = new Main;
const photoActions = new PhotoActions;

export function routes(app: any): void {
  app.post('/login', main.login);
  app.get('/register', main.register);
  app.get('/change-album-title', photoActions.changeAlbumTitle);
  app.get('/delete-album', photoActions.deleteAlbum);
  app.get('/delete-photo', photoActions.deletePhoto);
  app.get('/get-photos', photoActions.getPhotos);
  app.get('/load-photos', photoActions.loadPhotos);
}
