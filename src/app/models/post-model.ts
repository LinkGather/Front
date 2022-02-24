export interface PostModel {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  uploadTime: string;
  likeNum: number;
  userId: number;
  dibs: Dib[];
  likes: Like[];
}

export interface Dib {
  id: number;
  userId: number;
}

export interface Like {
  id: number;
  userId: number;
}
