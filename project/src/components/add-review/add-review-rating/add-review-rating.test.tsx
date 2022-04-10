import { render, screen} from '@testing-library/react';
import AddReviewRating from './add-review-rating';
import userEvent from '@testing-library/user-event';

describe('AddReviewRating', () => {
  it('should render "AddReviewRating" is success', () => {
    const handleRatingChange = jest.fn();

    render(<AddReviewRating rating={6} handleRatingChange={handleRatingChange} disabledForm={false}/>);

    expect(screen.getByTestId('add-review-rating')).toBeInTheDocument();
    const input = screen.getByTestId('input-rating-7');
    userEvent.click(input);

    expect(handleRatingChange).toBeCalled();
  });
});
