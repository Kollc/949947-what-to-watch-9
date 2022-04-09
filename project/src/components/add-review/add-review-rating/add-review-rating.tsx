import { ChangeEvent, Fragment } from 'react';

type AddReviewRatingProps = {
  rating: number;
  changeRatingHandler: (evt: ChangeEvent<HTMLInputElement>) => void;
  disabledForm: boolean;
}

function AddReviewRating({rating, changeRatingHandler, disabledForm}: AddReviewRatingProps): JSX.Element {
  const ratingStarsCount = [];

  for (let value = 1; value <= 10; value++) {
    ratingStarsCount.push(value);
  }

  return (
    <div className="rating__stars" data-testid='add-review-rating'>
      {ratingStarsCount.reverse().map((value) =>
        (
          <Fragment key={value}>
            <input
              data-testid={`input-rating-${value}`}
              onChange={changeRatingHandler}
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
