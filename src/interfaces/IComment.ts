export type Comment = {
  id: string;
  authorId: string;
  product_commentedId: string;
  title: string;
  stars: number;
  createdAt: Date;
};

export interface CommentTypeToGetByProduct {
    id: string;
    title: string;
    stars: number;
    likes: number
    createdAt: Date;
}
export interface ICommentParams {
  id: string;
}

export interface ICommentRepositories {
  create(
    authorId: string,
    product_commentedId: string,
    title: string,
    stars: number
  ): Promise<Comment>;

  getByUser(authorId: string): Promise<Comment[]>;

  getByProduct(product_commentedId: string): Promise<CommentTypeToGetByProduct[]>;
}
