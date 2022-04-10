import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../hooks';
import { getFilmComments } from '../../../../services/api';
import { setError } from '../../../../store/film-process/film-process';
import { ErrorType } from '../../../../types';
import { CommentType } from '../../../../types/comment';
import { getFromatedDate } from '../../../../utils';
import { getErrorMessage } from '../../../../utils/error';
import LoadingScreen from '../../../loading-screen/loading-screen';

type MovieReviewsTabProps = {
  filmId: number,
};

function MovieReviewsTab({filmId}: MovieReviewsTabProps): JSX.Element {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading]= useState(true);
  const [errorFetch, setErrorFetch] = useState<ErrorType>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getFilmComments(filmId, setErrorFetch).then((data) => {
      setComments(data);
      setLoading(false);
    });
  }, [filmId]);

  useEffect(() => {
    if(errorFetch) {
      dispatch(setError(getErrorMessage(errorFetch)));
    }
  }, [errorFetch]);

  if (loading || errorFetch) {
    return (
      <LoadingScreen/>
    );
  }

  return(
    <div className="film-card__reviews film-card__row" data-testid='review-wrapper'>
      <div className="film-card__reviews-col">
        {comments.slice(0, Math.ceil(comments.length/2)).map((comment) => (
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

      <div className="film-card__reviews-col">
        {comments.slice(Math.ceil(comments.length/2)).map((comment) => (
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
