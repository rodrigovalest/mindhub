import Navbar from "../components/shared/Navbar";
import PreviewPostSection from "../components/private/posts/preview/PreviewPostsSection";

export const Home = () => {
  return (
    <div className="w-full h-full">
      <Navbar />
      <PreviewPostSection />
    </div>
  );
}
