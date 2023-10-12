import Navbar from "../../components/shared/Navbar";
import { SearchPostsByUserSection } from "../../components/users/SearchPostsByUserSection";

export const SearchPostsByUser = () => {
  return (
    <div className="w-full h-full">
      <Navbar />
      <SearchPostsByUserSection />
    </div>
  );
}
