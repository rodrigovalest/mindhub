import LikeArrow from "../../assets/likeArrow.svg";
import LikeArrowFilled from "../../assets/likeArrowFilled.svg";

const LikeButtons = () => {
  return (
    <div className="w-[50px] mr-4">
      <img src={LikeArrow} alt="Like icon" className="h-[50px] w-[50px]" />
      <p className="text-center text-white py-2">1k</p>
      <img src={LikeArrow} alt="Unlike icon" className="h-[50px] w-[50px] transform rotate-180" />
    </div>
  );
}

export default LikeButtons;
