export interface Post {
  _id: string;
  title: string;
  text: string;
  imageUrl?: string;
  user: {
    _id: string;
    fullName: string;
    avatarUrl?: string;
  };
  createdAt: string;
  viewsCount: number;
  commentsCount: number;
  tags: string[];
}

export interface CreatePost {
  title: string;
  text: string;
  imageUrl?: string;
  tags?: string;
}
