import { useAppSelector } from '../../hooks';
import { getError } from '../../store/film-process/selectors';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector(getError);

  if (error) {
    return (
      <div
        data-testid='error-message'
        style={{
          position: 'fixed',
          bottom: '30px',
          left: '30px',
          padding: '10px',
          backgroundColor: '#d96666',
          color: 'white',
          borderRadius: '5px',
          zIndex: '100',
        }}
      >
        {`Error: ${error}`}
      </div>
    );
  }

  return null;
}

export default ErrorMessage;
