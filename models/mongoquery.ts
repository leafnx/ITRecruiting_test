import { User, Photo, Album } from '../db/mongodb';

import md5 from 'md5';

export class MongoQuery {
  userAdd(email: string, login: string, password: string) {
    const newuser = new User({
      login: login,
      email: email,
      password: md5(password),
      registerDate: Date.now()
    })

    newuser.save()
      .then(() => {
        console.log('user added')
      })
      .catch((err) => {
        console.log(err)
      });
  }

  userFind(login: string) {
    return User.findOne({login: login}, '_id login').exec()
  }

  userVerify(loginOrEmail: string, login: string, password: string) {
    return User.findOne({[loginOrEmail]: login, password: md5(password)}).exec()
  }

  photoAdd(photosArr: object[]) {
    return Photo.insertMany(photosArr)
  }

  albumAdd(albumsArr: object[]) {
    return Album.insertMany(albumsArr)
  }

  photoDelete(photosId: string[]) {
    return Photo.deleteMany({id: photosId})
  }

  albumDelete(albumsId: string[]) {
    Album.deleteMany({_id: albumsId})
      .then((result) => {
        console.log(result)
        Photo.deleteMany({albumId: albumsId})
          .then((result) => {
            console.log(result)
          })
      })
  }

  photoGet(ownerid: string, skip: number, maxonpage: number) {
    return Photo.find({owner: ownerid}, 'id', {skip: skip}).limit(maxonpage).exec()
  }

  albumTitlechange(albumid: number, new_album_name: string) {
    return Album.findByIdAndUpdate(albumid, {title: new_album_name})
  }
}
