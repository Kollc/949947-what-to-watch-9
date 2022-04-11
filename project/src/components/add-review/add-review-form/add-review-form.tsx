import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HttpCode, MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH } from '../../../consts';
import { useAppDispatch } from '../../../hooks';
import { addNewComment } from '../../../services/api';
import { setError } from '../../../store/film-process/film-process';
import { ErrorType } from '../../../types';
import { getErrorMessage, getErrorStatus } from '../../../utils/error';
import LoadingScreen from '../../loading-screen/loading-screen';
import AddReviewRating from '../add-review-rating/add-review-rating';

type AddReviewFormProps = {
  filmId: number,
}

function AddReviewForm({filmId}: AddReviewFormProps): JSX.Element {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [disabledSubmitButton, setDisabledSubmitButton] = useState(true);
  const [disabledForm, setDisabledForm] = useState(false);
  const navigate = useNavigate();
  const [errorFetch, setErrorFetch] = useState<ErrorType>(null);
  const dispatch = useAppDispatch();
  const [errorStatus, setErrorStatus] = useState<number>(HttpCode.Ok);

  const checkValidationFormData = () => {
    if(rating > 0 && comment.length >= 50) {
      setDisabledSubmitButton(false);
    }
  };

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
    checkValidationFormData();
  };

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
    checkValidationFormData();
  };

  useEffect(() => {
    if(errorFetch) {
      dispatch(setError(getErrorMessage(errorFetch)));
      setErrorStatus(getErrorStatus(errorFetch));
    }
  }, [errorFetch]);

  const handleFormCommentSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    setDisabledForm(true);

    addNewComment(comment, rating, filmId, setErrorFetch).then((res) => {
      if(res?.status === HttpCode.Ok) {
        navigate(-1);
      }

      setDisabledForm(false);
    }).catch(() => {
      setDisabledForm(false);
    });
  };

  if (errorFetch && errorStatus !== HttpCode.NotFound) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <form action="#" className="add-review__form" onSubmit={handleFormCommentSubmit} data-testid='add-review__form'>
      <AddReviewRating handleRatingChange={handleRatingChange} rating={rating} disabledForm={disabledForm}/>
      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          onChange={handleCommentChange}
          value={comment}
          required
          minLength={MIN_COMMENT_LENGTH}
          maxLength={MAX_COMMENT_LENGTH}
          disabled={disabledForm}
        >
        </textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={(disabledSubmitButton || disabledForm)} >Post</button>
        </div>
      </div>
    </form>
  );
}

export default AddReviewForm;
