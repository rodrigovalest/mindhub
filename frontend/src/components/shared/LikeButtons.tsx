import { useEffect, useState } from 'react';

import LikeArrow from '../../assets/likeArrow.svg';
import LikeArrowFilled from '../../assets/likeArrowFilled.svg';
import IPost from '../../interfaces/IPost';
import useFetchBackend from '../../hooks/useFetchBackend';

interface IPropsLikeButtons {
  post: IPost
}

const LikeButtons = ({ post }: IPropsLikeButtons) => {
  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);

  const fetchLike = useFetchBackend({ method: "PUT", path: `/likes/posts/${post.id}?type=true` });
  const fetchDislike = useFetchBackend({ method: "PUT", path: `/likes/posts/${post.id}?type=false` });
  const fetchRemoveLike = useFetchBackend({ method: "DELETE", path: `/likes/posts/${post.id}` });

  useEffect(() => {
    console.log(post);
    if (post.userLike != null) {
      post.userLike ? setLikeClicked(true) : setDislikeClicked(true); 
    }
  }, []);

  const handleLikeClick = async () => {
    if (likeClicked) {
      post.likeBalance--;
      handleRemoveLike();
      return;
    }

    post.likeBalance++;

    setLikeClicked(!likeClicked);
    if (dislikeClicked) {
      setDislikeClicked(false);
    }

    const response = await fetchLike(null);
    if (response instanceof Error) {
      setLikeClicked(!likeClicked);
    }
  };

  const handleDislikeClick = async () => {
    if (dislikeClicked) {
      post.likeBalance++;
      handleRemoveLike();
      return;
    }

    post.likeBalance--;

    setDislikeClicked(!dislikeClicked);
    if (likeClicked) {
      setLikeClicked(false);
    }

    const response = await fetchDislike(null);
    if (response instanceof Error) {
      setDislikeClicked(!likeClicked);
    }
  };

  const handleRemoveLike = async () => {
    setLikeClicked(false);
    setDislikeClicked(false);

    const response = await fetchRemoveLike(null);
    if (response instanceof Error) {
      setLikeClicked(!likeClicked);
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
        alt="Dislike icon"
        className="h-[50px] w-[50px] transform rotate-180 cursor-pointer"
        onClick={handleDislikeClick}
      />
    </div>
  );
};

export default LikeButtons;
