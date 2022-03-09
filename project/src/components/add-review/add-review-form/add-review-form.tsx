import { ChangeEvent, useState } from 'react';
import AddReviewRating from '../add-review-rating/add-review-rating';

function AddReviewForm(): JSX.Element {
  const [rating, setRating] = useState(1);
  const [reviewText, setReviewText] = useState('');

  const changeReviewTextHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(evt.target.value);
  };

  return (
    <form action="#" className="add-review__form">
      <AddReviewRating setRating={setRating} rating={rating}/>
      <div className="add-review__text">
        <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" onChange={changeReviewTextHandler} value={reviewText}></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>
      </div>
    </form>
  );
}

export default AddReviewForm;
