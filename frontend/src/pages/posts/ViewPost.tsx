import Navbar from "../../components/shared/Navbar";
import ViewPostSection from "../../components/private/posts/ViewPostSection";
import CommentSection from "../../components/private/posts/CommentsSection";

export const ViewPost = () => {
  return (
    <div>
      <Navbar />
      <ViewPostSection />
      <CommentSection />
    </div>
  );
}
