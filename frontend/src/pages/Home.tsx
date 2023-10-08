import Navbar from "../components/shared/Navbar";
import PreviewPostSection from "../components/shared/PreviewPosts/PreviewPostsSection";

export const Home = () => {
  return (
    <div className="w-full h-full">
      <Navbar />
      <PreviewPostSection />
    </div>
  );
}
