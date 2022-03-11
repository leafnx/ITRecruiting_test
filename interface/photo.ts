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

export {
  DeletealbumBody,
  DeletephotoBody,
  GetphotosBody,
  ChangealbumtitleBody,
  TokenData
}
