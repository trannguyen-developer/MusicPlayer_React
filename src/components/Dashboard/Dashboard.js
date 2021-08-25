import React, {useState, useRef, useEffect} from 'react'
import classes from './Dashboard.module.scss'
import FormGroup from '@material-ui/core/FormGroup';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';

const Dashboard =  props => {

    const PrettoSlider = withStyles({
        root: {
          color: '#ff4979',
        },
        thumb: {
          height: 0,
          width: 0,
          marginTop: -5,
          marginLeft: -8,
          '&:focus, &:hover, &:active': {
            boxShadow: 'inherit',
            height: 14,
            width: 14,
          },
        },
        valueLabel: {
          left: 'calc(-50% + 4px)',
        },
        track: {
          height: 4,
        },
        rail: {
          height: 4,
        },
      })(Slider);

      
    const audioRef = useRef()
    const [checked, setchecked] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [btnPlay, setBtnPlay] = useState(false)
    const [percentTime, setPercentTime] = useState(0)
    const [valueSlider, setValueSlider] = useState(0)

    const toggleChecked = () => {
        setchecked(!checked)
    }

    const clickHandlePlay = () => {
        setBtnPlay(!btnPlay)
        if(btnPlay) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
    }

    const playing = () => {
        setPercentTime(((audioRef.current.currentTime / audioRef.current.duration) * 100).toFixed(1))
    }

    const nextSong = () => {
        setCurrentIndex(currentIndex+1)
        setBtnPlay(false)
        audioRef.current.play()
    }

    const changeValSlider = (e) => {
        setPercentTime(e.target.value)
        console.log(e.target.value);
    }

    return(
    <div className={`${classes.dashboard} p-3`}>
        <ul className={classes.state}>
            <li className={classes.active}>List playing</li>
            <li>Karaoke</li>
            <li>Lyrics</li>
            <FormGroup className={`${classes['btn-toggle']} ${classes['MuiSlider-rail']}`}>
                <FormControlLabel
                    control={<Switch size="small" checked={checked} onChange={toggleChecked}/>}
                />
            </FormGroup>
        </ul>
        <div className={`${classes.cd} my-3`}>
            <div className={classes['cd-thumb']} style={{backgroundImage: `url(${props.songs[currentIndex].image})`}}></div>
        </div>
        <div className={`${classes.control} ${btnPlay && classes.play}`} onClick={clickHandlePlay}>
            <div className={`${classes.btn} btn-repeat`}>
                <i className={`fas fa-redo-alt`}></i>
            </div>
            <div className={`${classes.btn} btn-prev`}>
                <i className={`fas fa-step-backward`}></i>
            </div>
            <div className={`${classes.btn} ${classes['btn-toggle-play']}`}>
                <i className={`fas fa-pause ${classes['icon-pause']}`}></i>
                <i className={`fas fa-play ${classes['icon-play']}`}></i>
            </div>
            <div className={`${classes.btn} btn-next`} onClick={nextSong}>
                <i className={`fas fa-step-forward`}></i>
            </div>
            <div className={`${classes.btn} btn-random`}>
                <i className={`fas fa-random`}></i>
            </div>
        </div>
        <div className="mt-3">
            <PrettoSlider  aria-label="pretto slider" defaultValue={percentTime} onChange={changeValSlider} step={1}/>
            <audio id="audio" onTimeUpdate={playing} ref={audioRef} src={props.songs[currentIndex].path} ></audio>
        </div>
        <div className={classes['support-func']}>
            <div className={classes.time}>
                <span className={classes.currentTime}>
                    <span className={classes.minute}>4</span>:<span className={classes.seconds}>55</span>
                </span>/
                <span className="duration">
                    <span className={classes.minute}>2</span>:<span className={classes.seconds}>66</span>
                </span>
            </div>
            <div className={`${classes.volume} ${classes['v-down']}`}>
                <span className="material-icons volume-off">volume_off</span>
                <span className="material-icons volume-down">volume_down</span>
                <span className="material-icons volume-up">volume_up</span>
            </div>
        </div>
    </div>
    )
}

export default Dashboard
