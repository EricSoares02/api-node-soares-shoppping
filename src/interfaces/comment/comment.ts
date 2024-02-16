type CommentType = {
  id: string;
  authorId: string;
  product_commentedId: string;
  title: string;
  stars: number;
  createdAt: Date;
};

class Comment implements CommentType {
  authorId: string;
  createdAt: Date;
  id: string;
  product_commentedId: string;
  stars: number;
  title: string;

  constructor(data: CommentType) {
    this.authorId = data.authorId;
    this.createdAt = data.createdAt;
    this.id = data.id;
    this.product_commentedId = data.product_commentedId;
    this.stars = data.stars;
    this.title = data.title;
  }
}

export interface CommentTypeToGetByProduct {
  id: string;
  title: string;
  stars: number;
  likes: number;
  createdAt: Date;
}

export { Comment };
