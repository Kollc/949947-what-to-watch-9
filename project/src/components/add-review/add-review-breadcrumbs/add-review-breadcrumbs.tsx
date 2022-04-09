import { Link } from 'react-router-dom';
import { FilmType } from '../../../types';

type AddReviewBreadcrumbsProps = {
  film: FilmType,
};

function AddReviewBreadcrumbs({film}: AddReviewBreadcrumbsProps): JSX.Element {
  return (
    <nav className="breadcrumbs" data-testid='breadcrumbs'>
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to={`/films/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
        </li>
        <li className="breadcrumbs__item">
          <Link to='' className="breadcrumbs__link">Add review</Link>
        </li>
      </ul>
    </nav>
  );
}

export default AddReviewBreadcrumbs;
