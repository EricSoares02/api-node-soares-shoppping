

type LikeType = {
  id: string;
  authorId: string;
  commentId: string;
  makedAt: Date;
};



class Like implements LikeType {
  authorId: string;
  commentId: string;
  id: string;
  makedAt: Date;

  constructor(data: LikeType) {
    this.authorId = data.authorId
    this.commentId = data.commentId
    this.id = data.id
    this.makedAt = data.makedAt
  }

}

export { Like };
