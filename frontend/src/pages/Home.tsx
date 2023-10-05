import Navbar from "../components/shared/Navbar";
import PreviewPostSection from "../components/home/PreviewPostsSection";

export const Home = () => {
  return (
    <div className="w-full h-full">
      <Navbar />
      <PreviewPostSection />
    </div>
  );
}
