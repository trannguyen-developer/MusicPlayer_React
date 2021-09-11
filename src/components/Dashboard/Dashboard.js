import React, {useState, useRef, useEffect} from 'react'
import classes from './Dashboard.module.scss'
import variable from './Dashboard.module.scss'
import FormGroup from '@material-ui/core/FormGroup';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    wrapSlier: {
        marginLeft: '5px',
        overflow: 'hidden',
        width: '52px'
    },
    slider: {
        color: variable.primaryColor,
        marginBottom: '-3px',
        width: '40px',
        transition: 'all 0.1s linear',
        transform: 'rotate(180deg) translateX(50%)',
    }
})

const Dashboard =  props => {
    const styles = useStyles()
    
    const PrettoSlider = withStyles({
        root: {
            color: variable.primaryColor,
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
      
    const index = useSelector(state => state)
    const dispatch = useDispatch() 
    const audioRef = useRef()
    const cdThumb = useRef()
    const cdElement = useRef()
    const [checked, setChecked] = useState(true)
    const [btnPlay, setBtnPlay] = useState(false)
    const [percentTime, setPercentTime] = useState(0)
    const [durationTimeSeconds, setDurationTimeSeconds] = useState(0)
    const [durationTimeMinutes, setDurationTimeMinutes] = useState(0)
    const [currentTimeSeconds, setCurrentTimeSeconds] = useState(0)
    const [currentTimeMinutes, setCurrentTimeMinutes] = useState(0)
    const [volume, setVolume] = useState(0.6)
    const [storeOldVolume, setStoreOldVolume] = useState(volume)
    const [showVolume, setShowVolume] = useState(false)
    const [isRepeat, setIsRepeat] = useState(false)
    const [isRandom, setIsRandom] = useState(false)
    const [arrRandom, setArrRandom] = useState([])

    // function event
    const toggleChecked = () => {
        setChecked(!checked)
    }

    const clickHandlePlay = () => {
        setBtnPlay(!btnPlay)
    }

    const nextSong = () => {
        if(isRandom) {
            if(arrRandom.length === 10) {
                setArrRandom([Math.floor(Math.random()*props.songs.length)])
            } else {
                let random = Math.floor(Math.random()*props.songs.length)
                while(arrRandom.includes(random)) {
                random = Math.floor(Math.random()*props.songs.length)
            }
                setArrRandom([...arrRandom, random])
            }
            dispatch({type: 'random', random: arrRandom[arrRandom.length - 1]})
            return;
        }
        if(index >= props.songs.length - 1) {
            dispatch({type: 'max'})
            return;
        }
        dispatch({type: 'tang'})
    }

    const prevSong =() => {
        if(index <= 0) {
            dispatch({type: 'min', dataLength: props.songs.length})
            return;
        }
        dispatch({type: 'giam'})
    }

    const audioUpdateTime = () => {
        setPercentTime(((audioRef.current.currentTime / audioRef.current.duration) * 100).toFixed(1))
    }  

    const audioEnded = () => {
        if(isRepeat) {
            dispatch({type: 'repeat'})
            return;
        }
        nextSong()
    }

    const changeValSlider = (e, newValue) => {
        audioRef.current.currentTime = audioRef.current.duration*newValue/100
    }

    const handleChangeVolume = (e, newVolume) => {
        setVolume(newVolume)
    }

    const handleClickVolume = () => {
        if(volume > 0) {
            setVolume(0)
            setStoreOldVolume(volume)
        } else {
            setVolume(storeOldVolume)     
        }
    }
    
    const handleEnterVolume = () => {
        setShowVolume(true)
    }
    
    const handleLeaveVolume = () => {
        setShowVolume(false)
    }

    const handleClickRepeat = () => {
        setIsRepeat(!isRepeat)
    }

    const handleClickRandom = () => {
        setIsRandom(!isRandom)
    }
    
    // effect
    useEffect(() => {
        let currentTimeM = Math.floor(audioRef.current.currentTime / 60)
        let currentTimeS = Math.floor(audioRef.current.currentTime - currentTimeM * 60)
        let durationTimeM = Math.floor(audioRef.current.duration / 60)
        let durationTimeS = Math.floor(audioRef.current.duration - durationTimeM * 60)
        durationTimeM = durationTimeM ? durationTimeM : '00'
        durationTimeS = durationTimeS ? durationTimeS : '00'
        setCurrentTimeMinutes(`0${currentTimeM}`.slice(-2))
        setCurrentTimeSeconds(`0${currentTimeS}`.slice(-2))
        setDurationTimeMinutes(`0${durationTimeM}`.slice(-2))
        setDurationTimeSeconds(`0${durationTimeS}`.slice(-2))
    }, [percentTime])

    useEffect(() => {
        if(btnPlay) {
            audioRef.current.play()
            cdThumb.current.style.animationPlayState = 'running';
        } else {
            cdThumb.current.style.animationPlayState = 'paused';
            audioRef.current.pause()
        }
    })

    useEffect(() => {
        if(checked) {
            document.documentElement.setAttribute('data-theme', 'light')
        } else {
            document.documentElement.setAttribute('data-theme', 'dark')
        }
    })

    // volume
    useEffect(() => {
        audioRef.current.volume = volume
    }, [volume])

    useEffect(() => {
        const cdElementWith = cdElement.current.offsetWidth
        window.addEventListener('scroll', function() {
            let widthElement = cdElementWith - window.scrollY

            widthElement = widthElement >= 240 ? 240 : widthElement
            
            widthElement = widthElement > 0 ? widthElement : '0'
            cdElement.current.style.width = widthElement + 'px'
            cdElement.current.style.opacity = widthElement / cdElementWith
        })
        let random = Math.floor(Math.random()*props.songs.length)
        while(random === index) {
            random = Math.floor(Math.random()*props.songs.length)
        }
        setArrRandom([random])
    }, []);

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
        <div className={`${classes.cd} my-3`} ref={cdElement}>
            <div className={classes['cd-thumb']} style={{backgroundImage: `url(${props.songs[index].image})`}} ref={cdThumb}></div>
        </div>
        <div className={`${classes.control} ${btnPlay && classes.play}`}>
            <div className={`${classes.btn} btn-repeat ${isRepeat && classes.active}`} onClick={handleClickRepeat}>
                <i className={`fas fa-redo-alt`}></i>
            </div>
            <div className={`${classes.btn} btn-prev`} onClick={prevSong}>
                <i className={`fas fa-step-backward`}></i>
            </div>
            <div className={`${classes.btn} ${classes['btn-toggle-play']}`} onClick={clickHandlePlay}>
                <i className={`fas fa-pause ${classes['icon-pause']}`}></i>
                <i className={`fas fa-play ${classes['icon-play']}`}></i>
            </div>
            <div className={`${classes.btn} btn-next`} onClick={nextSong}>
                <i className={`fas fa-step-forward`}></i>
            </div>
            <div className={`${classes.btn} btn-random ${isRandom && classes.active}`} onClick={handleClickRandom}>
                <i className={`fas fa-random`}></i>
            </div>
        </div>
        <div className="mt-3">
            <PrettoSlider  aria-label="pretto slider" defaultValue={percentTime} onChangeCommitted={changeValSlider} step={1}/>
            <audio ref={audioRef} onTimeUpdate={audioUpdateTime} onEnded={audioEnded} src={props.songs[index].path} >
            </audio>
        </div>
        <div className={classes['support-func']}>
            <div className={classes.time}>
                <span className={classes.currentTime}>
                    <span className={classes.minute}>{currentTimeMinutes}</span>:<span className={classes.seconds}>{currentTimeSeconds}</span>
                </span> /
                <span className="duration">
                    <span className={classes.minute}> {durationTimeMinutes}</span>:<span className={classes.seconds}>{durationTimeSeconds}</span>
                </span>
            </div>
            <div className={`${classes.volume} ${volume > 0.5 ? classes['v-up'] : volume === 0 ? classes['v-off'] : classes['v-down']}`} onMouseEnter={handleEnterVolume} onMouseLeave={handleLeaveVolume}>
                <div onClick={handleClickVolume}>
                    <span className={`material-icons ${classes['volume-off']}`}>volume_off</span>
                    <span className={`material-icons ${classes['volume-down']}`}>volume_down</span>
                    <span className={`material-icons ${classes['volume-up']}`}>volume_up</span>
                </div>
                <div className={styles.wrapSlier} >
                    <Slider className={styles.slider} style={{ transform: `${showVolume ? 'rotate(180deg) translateX(0)' : 'rotate(180deg) translateX(130%)'}` }} defaultValue={0.6} value={volume} aria-labelledby="track-inverted-slider" step={0.1} max={1} onChange={handleChangeVolume} />
                </div>
            </div>
        </div>
    </div>
    )
}

export default Dashboard
