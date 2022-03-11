import { MongoQuery } from '../models/mongoquery';
import {
  DeletephotoBody,
  DeletealbumBody,
  GetphotosBody,
  ChangealbumtitleBody,
  TokenData
} from '../interface/photo';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const query = new MongoQuery;

export class PhotoActions {
  loadPhotos(req, res) {

      if ( req.session.token ) {
        axios.get('http://jsonplaceholder.typicode.com/photos')
          .then(async (resp) => {

            let login = (jwt.verify(req.session.token, 'privateKey') as TokenData).login;
            let user = await query.userFind(login);
            console.log(user)

            let data = resp.data;
            // let data = resp.data.filter( (item: Record<string, any>) => ((item.id - 1) % 50 == 0 || (item.id - 2) % 50 == 0) && item.albumId < 3 )
            // console.log(data) // ^^^ test

            let albumsArr = [];
            let albumsList = new Set(data.map((item: Record<string, any>) => item.albumId));
            albumsList.forEach((value: number) => {
              albumsArr.push({
                _id: value,
                title: value,
                owner: user._id
              })
            })

            query.albumAdd(albumsArr)
              .then((docs) => {
                let photosArr = data.map((item: Record<string, any>) => {
                  docs.forEach((item2: Record<string, any>) => {
                    if ( item.albumId == item2._id ) {
                      item._id = item.id;
                      delete item.id;
                      item.owner = user._id;
                    }
                  })
                  return item;
                })
                query.photoAdd(photosArr);
              })

          })
          .catch((err) => {
            console.log(err)
          })
          res.send('1')
      } else {
        res.send('0')
      }
  }

  deletePhoto(req, res) {
    let body: DeletephotoBody = req.body;

    if ( req.session.token ) {
      let arr = body.id.split(',')
      console.log(arr)

      query.photoDelete(arr)
        .then((result) => {
          console.log(result)
        })

      res.send('1')
    } else {
      res.send('0')
    }
  }

  deleteAlbum(req, res) {
    let body: DeletealbumBody = req.body;

    if ( req.session.token ) {
      let arr = body.id.split(',')
      console.log(arr)

      query.albumDelete(arr)

      res.send('1')
    } else {
      res.send('0')
    }

  }

  getPhotos(req, res) {
    let body: GetphotosBody = req.body;

    let maxonpage = body.maxcount;
    let skip = (body.page - 1) * maxonpage;

    query.photoGet(body.ownerid, skip, maxonpage)
      .then((result) => {
        res.send(result);
      })
      .catch((err) =>{
        console.log(err)
      })
  }

  changeAlbumTitle(req, res) {
    let body: ChangealbumtitleBody = req.body;
    let { albumid, new_album_name } = body;

    if ( req.session.token ) {
      query.albumTitlechange(+albumid, new_album_name)
        .then((result) => {
          console.log(result)
        })
        .catch((err) => {
          console.log(err)
        })

      res.send('1')
    } else {
      res.send('0')
    }
  }
}
