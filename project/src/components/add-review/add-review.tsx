import { useParams } from 'react-router-dom';
import { FilmType } from '../../types';
import { getFilmOnId } from '../../utils';
import Header from '../header/header';
import AddReviewForm from './add-review-form/add-review-form';

type AddReviewPageProps = {
  films: FilmType[]
}

function AddReviewPage({films}: AddReviewPageProps): JSX.Element  {
  const {id} = useParams<{id: string}>();
  const film: FilmType = getFilmOnId(films, id);

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.previewImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header/>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={film.name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <AddReviewForm/>
      </div>

    </section>
  );
}

export default AddReviewPage;
