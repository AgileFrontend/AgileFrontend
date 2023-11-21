export interface Post {
  title?: string;
  body?: string;
  imageURL: string;
  userId: string;
  postId?: string;
  date: number;
  likes: Array<string>;
}
