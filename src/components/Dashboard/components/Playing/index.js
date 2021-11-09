import React, { useState, useRef, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import variable from "./styles.module.scss";
import classes from "./styles.module.scss";
import { Slider } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import Lyrics from "../Lyrics";

const useStyles = makeStyles({
  wrapSlier: {
    marginLeft: "5px",
    overflow: "hidden",
    width: "52px",
  },
  slider: {
    color: variable.primaryColor,
    marginBottom: "-3px",
    width: "40px",
    transition: "all 0.1s linear",
    transform: "rotate(180deg) translateX(50%)",
  },
});

function Playing({ songs, indexTab }) {
  const styles = useStyles();
  const audioRef = useRef();
  const index = useSelector((state) => state);
  const dispatch = useDispatch();
  const cdThumb = useRef();
  const cdElement = useRef();
  const [btnPlay, setBtnPlay] = useState(false);
  const [durationTimeSeconds, setDurationTimeSeconds] = useState(0);
  const [durationTimeMinutes, setDurationTimeMinutes] = useState(0);
  const [currentTimeSeconds, setCurrentTimeSeconds] = useState(0);
  const [currentTimeMinutes, setCurrentTimeMinutes] = useState(0);
  const [volume, setVolume] = useState(0.6);
  const [storeOldVolume, setStoreOldVolume] = useState(volume);
  const [showVolume, setShowVolume] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [arrRandom, setArrRandom] = useState([]);
  const [percentTime, setPercentTime] = useState(0);
  const [cdRotate, setCdRotate] = useState("paused");
  const [cdParam, setCDParam] = useState({
    width: "",
    opacity: "",
  });

  const PrettoSlider = withStyles({
    root: {
      color: variable.primaryColor,
    },
    thumb: {
      height: 0,
      width: 0,
      marginTop: -5,
      marginLeft: -8,
      "&:focus, &:hover, &:active": {
        boxShadow: "inherit",
        height: 14,
        width: 14,
      },
    },
    valueLabel: {
      left: "calc(-50% + 4px)",
    },
    track: {
      height: 4,
    },
    rail: {
      height: 4,
    },
  })(Slider);

  const clickHandlePlay = () => {
    setBtnPlay(!btnPlay);
  };

  const nextSong = () => {
    if (isRandom) {
      if (arrRandom.length === 10) {
        setArrRandom([Math.floor(Math.random() * songs.length)]);
      } else {
        let random = Math.floor(Math.random() * songs.length);
        while (arrRandom.includes(random)) {
          random = Math.floor(Math.random() * songs.length);
        }
        setArrRandom([...arrRandom, random]);
      }
      dispatch({ type: "random", random: arrRandom[arrRandom.length - 1] });
      return;
    }
    if (index >= songs.length - 1) {
      dispatch({ type: "max" });
      return;
    }
    dispatch({ type: "tang" });
  };

  const prevSong = () => {
    if (index <= 0) {
      dispatch({ type: "min", dataLength: songs.length });
      return;
    }
    dispatch({ type: "giam" });
  };

  const audioEnded = () => {
    if (isRepeat) {
      audioRef.current.load();
      return;
    }
    nextSong();
  };

  const audioUpdateTime = () => {
    setPercentTime(
      (
        (audioRef.current.currentTime / audioRef.current.duration) *
        100
      ).toFixed(1)
    );
  };

  const changeValSlider = (e, newValue) => {
    audioRef.current.currentTime = (audioRef.current.duration * newValue) / 100;
  };

  const handleChangeVolume = (e, newVolume) => {
    setVolume(newVolume);
  };

  const handleClickVolume = () => {
    if (volume > 0) {
      setVolume(0);
      setStoreOldVolume(volume);
    } else {
      setVolume(storeOldVolume);
    }
  };

  const handleEnterVolume = () => {
    setShowVolume(true);
  };

  const handleLeaveVolume = () => {
    setShowVolume(false);
  };

  const handleClickRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const handleClickRandom = () => {
    setIsRandom(!isRandom);
  };

  // effect
  useEffect(() => {
    let currentTimeM = Math.floor(audioRef?.current?.currentTime / 60);
    let currentTimeS = Math.round(
      audioRef?.current?.currentTime - currentTimeM * 60
    );
    let durationTimeM = Math.floor(audioRef?.current?.duration / 60);
    let durationTimeS = Math.round(
      audioRef.current.duration - durationTimeM * 60
    );
    durationTimeM = durationTimeM ? durationTimeM : "00";
    durationTimeS = durationTimeS ? durationTimeS : "00";
    setCurrentTimeMinutes(`0${currentTimeM}`.slice(-2));
    setCurrentTimeSeconds(`0${currentTimeS}`.slice(-2));
    setDurationTimeMinutes(`0${durationTimeM}`.slice(-2));
    setDurationTimeSeconds(`0${durationTimeS}`.slice(-2));
  }, [percentTime]);

  useEffect(() => {
    if (btnPlay) {
      audioRef.current.play();
      setCdRotate("running");
    } else {
      audioRef.current.pause();
      setCdRotate("paused");
    }
  }, [btnPlay, index]);

  useEffect(() => {
    window.addEventListener("keydown", function (e) {
      switch (e.keyCode) {
        case 32:
          setBtnPlay(!btnPlay);
          break;
        case 37:
          audioRef.current.currentTime = audioRef.current.currentTime - 5;
          break;
        case 39:
          audioRef.current.currentTime = audioRef.current.currentTime + 5;
          break;
        default:
          break;
      }
    });

    return () => {
      window.removeEventListener("keydown", function (e) {
        switch (e.keyCode) {
          case 32:
            setBtnPlay(!btnPlay);
            break;
          case 37:
            audioRef.current.currentTime = audioRef.current.currentTime - 5;
            break;
          case 39:
            audioRef.current.currentTime = audioRef.current.currentTime + 5;
            break;
          default:
            break;
        }
      });
    };
  }, []);

  // volume
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const cdElementWith = cdElement?.current?.offsetWidth;
    document?.addEventListener("scroll", function () {
      let widthElement = cdElementWith - window?.scrollY;

      widthElement = widthElement >= 240 ? 240 : widthElement;

      widthElement = widthElement > 0 ? widthElement : "0";
      setCDParam({
        width: widthElement + "px",
        opacity: widthElement / cdElementWith,
      });
    });
  }, []);

  useEffect(() => {
    let random = Math.floor(Math.random() * songs.length);
    while (random === index) {
      random = Math.floor(Math.random() * songs.length);
    }
    setArrRandom([random]);
  }, [index, songs.length]);

  return (
    <div className={classes.playing}>
      {indexTab === 0 ? (
        <div className={`${classes.cd} my-3`} ref={cdElement} style={cdParam}>
          <div
            className={classes["cd-thumb"]}
            style={{
              backgroundImage: `url(${songs[index].image})`,
              animationPlayState: cdRotate,
            }}
            ref={cdThumb}
          ></div>{" "}
        </div>
      ) : indexTab === 1 ? (
        <h3>This feature is updateing</h3>
      ) : indexTab === 2 ? (
        <Lyrics
          currentTimeAudio={audioRef.current.currentTime.toFixed(2)}
          indexSong={index}
        />
      ) : (
        ""
      )}
      <div className={`${classes.control} ${btnPlay && classes.play}`}>
        <div
          className={`${classes.btn} btn-repeat ${isRepeat && classes.active}`}
          onClick={handleClickRepeat}
        >
          <i className={`fas fa-redo-alt`}></i>
        </div>
        <div className={`${classes.btn} btn-prev`} onClick={prevSong}>
          <i className={`fas fa-step-backward`}></i>
        </div>
        <div
          className={`${classes.btn} ${classes["btn-toggle-play"]}`}
          onClick={clickHandlePlay}
        >
          <i className={`fas fa-pause ${classes["icon-pause"]}`}></i>
          <i className={`fas fa-play ${classes["icon-play"]}`}></i>
        </div>
        <div className={`${classes.btn} btn-next`} onClick={nextSong}>
          <i className={`fas fa-step-forward`}></i>
        </div>
        <div
          className={`${classes.btn} btn-random ${isRandom && classes.active}`}
          onClick={handleClickRandom}
        >
          <i className={`fas fa-random`}></i>
        </div>
      </div>
      <div className="mt-3">
        <PrettoSlider
          aria-label="pretto slider"
          defaultValue={percentTime}
          onChangeCommitted={changeValSlider}
          step={1}
        />
        <audio
          ref={audioRef}
          onTimeUpdate={audioUpdateTime}
          onEnded={audioEnded}
          src={songs[index].path}
        />
      </div>
      <div className={classes["support-func"]}>
        <div className={classes.time}>
          <span className={classes.currentTime}>
            <span className={classes.minute}>{currentTimeMinutes}</span>:
            <span className={classes.seconds}>{currentTimeSeconds}</span>
          </span>{" "}
          /
          <span className="duration">
            <span className={classes.minute}> {durationTimeMinutes}</span>:
            <span className={classes.seconds}>{durationTimeSeconds}</span>
          </span>
        </div>
        <div
          className={`${classes.volume} ${
            volume > 0.5
              ? classes["v-up"]
              : volume === 0
              ? classes["v-off"]
              : classes["v-down"]
          }`}
          onMouseEnter={handleEnterVolume}
          onMouseLeave={handleLeaveVolume}
        >
          <div onClick={handleClickVolume}>
            <span className={`material-icons ${classes["volume-off"]}`}>
              volume_off
            </span>
            <span className={`material-icons ${classes["volume-down"]}`}>
              volume_down
            </span>
            <span className={`material-icons ${classes["volume-up"]}`}>
              volume_up
            </span>
          </div>
          <div className={styles.wrapSlier}>
            <Slider
              className={styles.slider}
              style={{
                transform: `${
                  showVolume
                    ? "rotate(180deg) translateX(0)"
                    : "rotate(180deg) translateX(130%)"
                }`,
              }}
              defaultValue={0.6}
              value={volume}
              aria-labelledby="track-inverted-slider"
              step={0.1}
              max={1}
              onChange={handleChangeVolume}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Playing;
