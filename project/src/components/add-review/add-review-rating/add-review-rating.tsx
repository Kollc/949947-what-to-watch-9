import { Fragment } from 'react';

type AddReviewRatingProps = {
  rating: number;
  setRating: (rating: number) => void;
}

function AddReviewRating({rating, setRating}: AddReviewRatingProps): JSX.Element {
  const ratingStarsCount = [];

  for (let value = 1; value <= 10; value++) {
    ratingStarsCount.push(value);
  }

  return (
    <div className="rating__stars">
      {ratingStarsCount.reverse().map((value) =>
        (
          <Fragment key={value}>
            <input onChange={(evt) => setRating(Number(evt.target.value))} className="rating__input" id={`star-${value}`} type="radio" name="rating" value={value} checked={value === rating} />
            <label className="rating__label" htmlFor={`star-${value}`}>Rating {value}</label>
          </Fragment>
        ),
      )}
    </div>
  );
}

export default AddReviewRating;
