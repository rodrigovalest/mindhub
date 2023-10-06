import Navbar from "../../components/shared/Navbar";
import ViewPostSection from "../../components/posts/ViewPostSection";
import CommentSection from "../../components/posts/CommentsSection";

export const ViewPost = () => {
  return (
    <div>
      <Navbar />
      <ViewPostSection />
      <CommentSection />
    </div>
  );
}
