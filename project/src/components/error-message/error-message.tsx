import {useAppSelector} from '../../hooks';

function ErrorMessage(): JSX.Element | null {
  const {error} = useAppSelector((state) => state.FILM);

  if (error) {
    return (
      <div
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
