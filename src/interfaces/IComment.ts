
export type Comment= {

    id: string
    authorId: string
    product_commentedId:  string
    title: string
    stars: number
    
    }
    
    export  interface ICommentParams{
        id: string
    }
    
    export interface ICommentRepositories {
        create(
            authorId: string,
            product_commentedId:  string,
            title: string,
            stars: number
        ): Promise<Comment>;
      
        getByUser(authorId: string): Promise<Comment[]>;
    
        getByProduct(product_commentedId: string): Promise<Comment[]>;
      
    
      }