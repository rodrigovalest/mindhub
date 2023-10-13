import Navbar from "../../components/shared/Navbar";
import { SearchPostsSection } from "../../components/private/search/SearchPostsSection";

export const SearchPosts = () => {
  return (
    <div className="w-full h-full">
      <Navbar />
      <SearchPostsSection />
    </div>
  );
}
