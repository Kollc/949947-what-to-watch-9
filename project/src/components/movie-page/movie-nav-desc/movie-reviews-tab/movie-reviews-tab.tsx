import { useEffect, useState } from 'react';
import { getFilmComments } from '../../../../services/api';
import { CommentType } from '../../../../types/comment';
import { getFromatedDate } from '../../../../utils';
import LoadingScreen from '../../../loading-screen/loading-screen';

type MovieReviewsTabProps = {
  filmId: number,
};

function MovieReviewsTab({filmId}: MovieReviewsTabProps): JSX.Element {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading]= useState(true);

  useEffect(() => {
    getFilmComments(filmId).then((data) => {
      setComments(data);
      setLoading(false);
    });
  }, [filmId]);

  if (loading) {
    return (
      <LoadingScreen/>
    );
  }

  return(
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">

        {comments.map((comment) => (
          <div className="review" key={comment.id}>
            <blockquote className="review__quote">
              <p className="review__text">{comment.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{comment.user.name}</cite>
                <time className="review__date" dateTime="2016-12-24">{getFromatedDate(comment.date)}</time>
              </footer>
            </blockquote>

            <div className="review__rating">{comment.rating}</div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default MovieReviewsTab;
