interface IPost {
  id: string,
  userId: string,
  title: string,
  mdText: string, 
  category: string,
  username: string,
  likeBalance: number
}

export default IPost;
