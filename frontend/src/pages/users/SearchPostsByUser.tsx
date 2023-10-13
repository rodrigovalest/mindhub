import Navbar from "../../components/shared/Navbar";
import { SearchPostsByUserSection } from "../../components/private/users/SearchPostsByUserSection";

export const SearchPostsByUser = () => {
  return (
    <div className="w-full h-full">
      <Navbar />
      <SearchPostsByUserSection />
    </div>
  );
}
