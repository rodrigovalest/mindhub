import { useState } from 'react';

import LikeArrow from '../../assets/likeArrow.svg';
import LikeArrowFilled from '../../assets/likeArrowFilled.svg';
import IPost from '../../interfaces/IPost';

interface IPropsLikeButtons {
  post: IPost
}

const LikeButtons = ({ post }: IPropsLikeButtons) => {
  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);

  const handleLikeClick = () => {
    setLikeClicked(!likeClicked);
    if (dislikeClicked) {
      setDislikeClicked(false);
    }
  };

  const handleDislikeClick = () => {
    setDislikeClicked(!dislikeClicked);
    if (likeClicked) {
      setLikeClicked(false);
    }
  };

  return (
    <div className="w-[50px] mr-4 block">
      <img
        src={likeClicked ? LikeArrowFilled : LikeArrow}
        alt="Like icon"
        className="h-[50px] w-[50px] cursor-pointer"
        onClick={handleLikeClick}
      />
      <p className="text-center text-white py-2">
        {post.likeBalance}
      </p>
      <img
        src={dislikeClicked ? LikeArrowFilled : LikeArrow}
        alt="Unlike icon"
        className="h-[50px] w-[50px] transform rotate-180 cursor-pointer"
        onClick={handleDislikeClick}
      />
    </div>
  );
};

export default LikeButtons;
