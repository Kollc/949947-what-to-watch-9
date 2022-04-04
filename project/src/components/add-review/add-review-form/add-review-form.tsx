import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HTTP_CODE } from '../../../consts';
import { addNewComment } from '../../../services/api';
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

  const checkValidationFormData = () => {
    if(rating > 0 && comment.length >= 50) {
      setDisabledSubmitButton(false);
    }
  };

  const changeRatingHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
    checkValidationFormData();
  };

  const changeCommentHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
    checkValidationFormData();
  };

  const submitFormCommentHandler = (evt: FormEvent) => {
    evt.preventDefault();
    setDisabledForm(true);

    addNewComment(comment, rating, filmId).then((res) => {
      if(res?.status === HTTP_CODE.OK) {
        navigate(-1);
      }

      setDisabledForm(false);
    }).catch(() => {
      setDisabledForm(false);
    });
  };

  return (
    <form action="#" className="add-review__form" onSubmit={submitFormCommentHandler}>
      <AddReviewRating changeRatingHandler={changeRatingHandler} rating={rating} disabledForm={disabledForm}/>
      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          onChange={changeCommentHandler}
          value={comment}
          required
          minLength={50}
          maxLength={400}
          disabled={disabledForm && true}
        >
        </textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={(disabledSubmitButton || disabledForm)  && true} >Post</button>
        </div>
      </div>
    </form>
  );
}

export default AddReviewForm;
