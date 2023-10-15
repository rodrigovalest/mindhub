import { useEffect, useState } from 'react';

import LikeArrow from '../../../assets/likeArrow.svg';
import LikeArrowFilled from '../../../assets/likeArrowFilled.svg';
import IPost from '../../../interfaces/IPost';
import useFetchBackend from '../../../hooks/useFetchBackend';
import IComment from '../../../interfaces/IComment';

interface IPropsCommentLikeButtons {
  comment: IComment
}

const CommentLikeButtons = ({ comment }: IPropsCommentLikeButtons) => {
  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);

  const fetchLike = useFetchBackend({ method: "PUT", path: `/likes/comments/${comment.id}?type=true` });
  const fetchDislike = useFetchBackend({ method: "PUT", path: `/likes/comments/${comment.id}?type=false` });
  const fetchRemoveLike = useFetchBackend({ method: "DELETE", path: `/likes/comments/${comment.id}` });

  useEffect(() => {
    if (comment.userLike != null) {
      comment.userLike ? setLikeClicked(true) : setDislikeClicked(true);
    }
  }, []);

  const handleLikeClick = async () => {
    if (likeClicked) {
      comment.likeBalance--;
      handleRemoveLike();
      return;
    }

    comment.likeBalance++;

    setLikeClicked(!likeClicked);
    if (dislikeClicked) {
      setDislikeClicked(false);
      comment.likeBalance++;
    }

    const response = await fetchLike(null);
    if (response instanceof Error) {
      setLikeClicked(!likeClicked);
    }
  };

  const handleDislikeClick = async () => {
    if (dislikeClicked) {
      comment.likeBalance++;
      handleRemoveLike();
      return;
    }

    comment.likeBalance--;

    setDislikeClicked(!dislikeClicked);
    if (likeClicked) {
      comment.likeBalance--;
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
        {comment.likeBalance}
      </p>
      <img
        src={dislikeClicked ? LikeArrowFilled : LikeArrow}
        alt="Dislike icon"
        className="h-[50px] w-[50px] transform rotate-180 cursor-pointer"
        onClick={handleDislikeClick}
      />
    </div>
  );
}

export default CommentLikeButtons;
