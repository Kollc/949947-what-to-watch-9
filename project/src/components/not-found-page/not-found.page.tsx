import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';
import Footer from '../footer/footer';
import Header from '../header/header';
import './not-found-page.css';

function NotFoundPage() :JSX.Element {
  return (
    <div className="user-page">
      <Header/>
      <div className="sign-in user-page__content">
        <h1 className='not-found-page__title'>
          404 Not Found
        </h1>
        <Link className='btn not-found-page__go-back' to={AppRoute.Main}>
          Return to main page
        </Link>
      </div>
      <Footer/>
    </div>
  );
}

export default NotFoundPage;
