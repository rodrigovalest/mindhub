interface IPost {
  id: string,
  userId: string,
  title: string,
  mdText: string, 
  category: string,
  username: string,
  likeBalance: number,
  userLike: boolean | null
}

export default IPost;
