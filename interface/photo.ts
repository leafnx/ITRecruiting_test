interface DeletephotoBody {
  id: string;
}
interface DeletealbumBody {
  id: string;
}
interface GetphotosBody {
  ownerid: string;
  page: number;
  maxcount: number;
}
interface ChangealbumtitleBody {
  albumid: string;
  new_album_name: string;
}

interface TokenData {
  login: string;
  iat: number;
}

interface PhotoInterface {
  _id: number | void;
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  owner: string | void;
}

export {
  DeletealbumBody,
  DeletephotoBody,
  GetphotosBody,
  ChangealbumtitleBody,
  TokenData,
  PhotoInterface
}
