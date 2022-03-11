import mongoose from 'mongoose';
import 'dotenv/config';


const dburl = `mongodb+srv://${process.env.DBLOGIN}:${process.env.DBPASSWORD}@${process.env.DBHOST}`;
const conn = mongoose.createConnection(dburl);

const usersSchema = new mongoose.Schema({
  login: String,
  email: String,
  password: String,
  registerDate: Date
})
const photosSchema = new mongoose.Schema({
  _id: Number,
  albumId: Number, // ref to albums
  title: String,
  url: String,
  thumbnailUrl: String,
  owner: 'ObjectID' // ref to users
})
const albumsSchema = new mongoose.Schema({
  _id: Number,
  title: String,
  owner: 'ObjectID' // ref to users
})

const User = conn.model('User', usersSchema);
const Photo = conn.model('Photo', photosSchema);
const Album = conn.model('Album', albumsSchema);

export { User, Photo, Album }
