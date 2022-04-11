import { ChangeEvent, Fragment } from 'react';
import { MAX_VALUE_RATING, MIN_VALUE_RATING } from '../../../consts';

type AddReviewRatingProps = {
  rating: number;
  handleRatingChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  disabledForm: boolean;
}

function AddReviewRating({rating, handleRatingChange, disabledForm}: AddReviewRatingProps): JSX.Element {
  const ratingStarsCount = [];

  for (let value = MIN_VALUE_RATING; value <= MAX_VALUE_RATING; value++) {
    ratingStarsCount.push(value);
  }

  return (
    <div className="rating__stars" data-testid='add-review-rating'>
      {ratingStarsCount.reverse().map((value) =>
        (
          <Fragment key={value}>
            <input
              data-testid={`input-rating-${value}`}
              onChange={handleRatingChange}
              className="rating__input"
              id={`star-${value}`}
              type="radio"
              name="rating"
              value={value}
              checked={value === rating}
              disabled={disabledForm && true}
            />
            <label className="rating__label" htmlFor={`star-${value}`}>Rating {value}</label>
          </Fragment>
        ),
      )}
    </div>
  );
}

export default AddReviewRating;
