import { CommentRepository } from "../../repositories/comment/CommentRepository";

class CommentService {
  constructor(private CommentRepository: CommentRepository) {}

  public async executeCreateCommentRepository(
    authorId: string,
    product_commentedId: string,
    title: string,
    stars: number
  ) {
    const created = await this.CommentRepository.create(
      authorId,
      product_commentedId,
      title,
      stars
    );

    return created;
  }

  public async executeGetCommentByProductRepository(
    product_commentedId: string
  ) {
    const commentsByProduct = await this.CommentRepository.getByProduct(
      product_commentedId
    );

    return commentsByProduct;
  }

  public async executeGetCommentByUserRepository(authorId: string) {
    const commentsByUser = await this.CommentRepository.getByUser(authorId);

    return commentsByUser;
  }
}
export { CommentService };
