import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getFilmById } from '../../services/api';
import { FilmType } from '../../types';
import LoadingScreen from '../loading-screen/loading-screen';

function Player(): JSX.Element {
  const {id} = useParams<{id: string}>();
  const [film, setFilm] = useState<FilmType | null>(null);
  const [loading, setLoading]= useState(true);
  const navigate = useNavigate();

  const [playing, setPlaying] = useState(false);
  const [videoFullTime, setVideoTime] = useState(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const player = useRef() as MutableRefObject<HTMLVideoElement>;

  useEffect(() => {
    getFilmById(Number(id)).then((data) => {
      setFilm(data);
      setLoading(false);
    });
  }, [id]);

  const clickPauseHandler = () => {
    player.current.pause();
    setPlaying(false);
  };

  const clickPlayHandler = () => {
    player.current.play();
    setPlaying(true);
  };

  if(player.current) {
    player.current.ontimeupdate = () => {
      setVideoCurrentTime(player.current?.currentTime);
      setVideoProgress((player.current?.currentTime / videoFullTime) * 100);
    };
  }

  useEffect(() => {
    if(player.current) {
      setVideoTime(player.current.duration);
    }
  }, [playing]);

  const getVideoTimeLeft = (fullTime: number, currentTime: number) => {
    const timeLeft = fullTime - currentTime;
    return `${Math.floor(timeLeft / 60)  }:${  (`0${  Math.floor(timeLeft % 60)}`).slice(-2)}`;
  };

  const clickFullScreenHandler = () => {
    player.current.requestFullscreen();
  };

  const exitPlayer = () => {
    navigate(-1);
  };


  if (loading) {
    return (
      <LoadingScreen/>
    );
  }

  if (film === null) {
    return <Navigate to="/404"/>;
  }

  return (
    <div className="player" data-testid='player'>
      <video data-testid='video' ref={player} src={film?.videoLink} id="video" className="player__video" poster={film?.posterImage}></video>

      <button type="button" className="player__exit" onClick={exitPlayer}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={videoProgress} max="100"></progress>
            <div className="player__toggler" style={{left: `${videoProgress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value"> {videoFullTime && videoCurrentTime ? getVideoTimeLeft(videoFullTime, videoCurrentTime) : '0:00:00'}</div>
        </div>

        <div className="player__controls-row">
          {playing ? (
            <button type="button" className="player__play" onClick={clickPauseHandler}>
              <svg viewBox="0 0 14 21" width="14" height="21">
                <use xlinkHref="#pause"></use>
              </svg>
              <span>Pause</span>
            </button>
          ) : (
            <button type="button" className="player__play" onClick={clickPlayHandler} data-testid='play'>
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>
          )}

          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen" onClick={clickFullScreenHandler}>
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
