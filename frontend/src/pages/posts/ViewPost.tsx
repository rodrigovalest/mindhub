import Navbar from "../../components/shared/Navbar";
import PostSection from "../../components/private/posts/PostSection";
import CommentSection from "../../components/private/posts/CommentsSection";

export const ViewPost = () => {
  return (
    <div>
      <Navbar />
      <PostSection />
      <CommentSection />
    </div>
  );
}
