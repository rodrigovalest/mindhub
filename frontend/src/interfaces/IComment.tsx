interface IComment {
  id: string;
  userId: string;
  username: string;
  postId: string;
  mdText: string,
  parentCommentId: string | null;
  children?: IComment[];
}

export default IComment;
