interface IComment {
  id: string,
  userId: string,
  username: string,
  postId: string,
  mdText: string,
  parentCommentId: string | null,
  children?: IComment[],
  likeBalance: number,
  userLike: boolean | null
}

export default IComment;
