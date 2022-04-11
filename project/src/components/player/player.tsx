import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { HttpCode, PERCENTAGES, SECONDS_IN_MINUTE } from '../../consts';
import { useAppDispatch } from '../../hooks';
import { getFilmById } from '../../services/api';
import { setError } from '../../store/film-process/film-process';
import { ErrorType, FilmType } from '../../types';
import { getErrorMessage, getErrorStatus } from '../../utils/error';
import LoadingScreen from '../loading-screen/loading-screen';

function Player(): JSX.Element {
  const {id} = useParams<{id: string}>();
  const [film, setFilm] = useState<FilmType | null>(null);
  const [loading, setLoading]= useState(true);
  const navigate = useNavigate();

  const [playing, setPlaying] = useState(false);
  const [videoFullTime, setvideoFullTime] = useState(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const player = useRef() as MutableRefObject<HTMLVideoElement>;
  const [errorFetch, setErrorFetch] = useState<ErrorType>(null);
  const [errorStatus, setErrorStatus] = useState<number>(HttpCode.Ok);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getFilmById(Number(id), setErrorFetch).then((data) => {
      setFilm(data);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if(errorFetch) {
      dispatch(setError(getErrorMessage(errorFetch)));
      setErrorStatus(getErrorStatus(errorFetch));
    }
  }, [errorFetch]);

  const handlePauseClick = () => {
    player.current.pause();
    setPlaying(false);
  };

  const handlePlayClick = () => {
    player.current.play();
    setPlaying(true);
  };

  if(player.current) {
    player.current.ontimeupdate = () => {
      setVideoCurrentTime(player.current?.currentTime);
      setVideoProgress((player.current?.currentTime / videoFullTime) * PERCENTAGES);
    };
  }

  useEffect(() => {
    if(player.current) {
      setvideoFullTime(player.current.duration);
    }
  }, [playing]);

  const getVideoTimeLeft = (fullTime: number, currentTime: number) => {
    const timeLeft = fullTime - currentTime;
    return `${Math.floor(timeLeft / SECONDS_IN_MINUTE)  }:${  (`0${  Math.floor(timeLeft % SECONDS_IN_MINUTE)}`).slice(-2)}`;
  };

  const handleFullScreenClick = () => {
    player.current.requestFullscreen();
  };

  const exitPlayer = () => {
    navigate(-1);
  };

  if ((loading || errorFetch) && errorStatus !== HttpCode.NotFound) {
    return (
      <LoadingScreen/>
    );
  }

  if (film === null || film === undefined) {
    return <Navigate to="/404"/>;
  }

  return (
    <div className="player" data-testid='player'>
      <video data-testid='video' autoPlay ref={player} src={film?.videoLink} id="video" className="player__video" poster={film?.posterImage} onPlay={() => setPlaying(true)}></video>

      <button type="button" className="player__exit" onClick={exitPlayer}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={videoProgress} max="100"></progress>
            <div className="player__toggler" style={{left: `${videoProgress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value"> - {videoFullTime && videoCurrentTime ? getVideoTimeLeft(videoFullTime, videoCurrentTime) : '0:00:00'}</div>
        </div>

        <div className="player__controls-row">
          {playing ? (
            <button type="button" className="player__play" onClick={handlePauseClick} data-testid='player-pause'>
              <svg viewBox="0 0 14 21" width="14" height="21">
                <use xlinkHref="#pause"></use>
              </svg>
              <span>Pause</span>
            </button>
          ) : (
            <button type="button" className="player__play" onClick={handlePlayClick} data-testid='play'>
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>
          )}

          <div className="player__name">{film.name}</div>

          <button type="button" className="player__full-screen" onClick={handleFullScreenClick}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;
