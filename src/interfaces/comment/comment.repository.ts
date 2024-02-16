import { Comment } from './comment'


export interface ICommentRepository {
    
    create(data: Comment): Promise<Comment>;

    update(data: Comment): Promise<Comment>
  
    getByUser(authorId: string): Promise<Comment[] | null>;
  
    getByProduct(product_commentedId: string): Promise<Comment[] | null>;

    delete(id: string): Promise<void>

  }