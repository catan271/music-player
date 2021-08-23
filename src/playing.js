import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import thumb from './img/music-icon-default.jpg'

export default function Dashboard(props) {
    const [paused, setPaused] = useState(true)
    const [audio, setAudio] = useState()
    const [progress, setProgress] = useState()
    const [shuffle, setShuffle] = useState(false)
    const [loop, setLoop] = useState(false)

    const togglePlay = () => {
        if (paused) audio.play()
        else audio.pause()
        setPaused(!paused)
    }

    const toggleShuffle = () => {
        setShuffle(!shuffle)
    }

    const toggleLoop = () => {
        setLoop(!loop)
    }

    const handleProgress = (e) => {
        const max = e.target.max
        const val = e.target.value
        
        e.target.style.backgroundSize = val * 100 / max + '% 100%'

        audio.currentTime = val / max * audio.duration
    }

    const handleNext = () => {
        if (shuffle) props.dispatch({type: 'shuffle'})
        else props.dispatch({type: 'next'})
    }

    const handlePrevious = () => {
        if (shuffle) props.dispatch({type: 'shuffle'})
        props.dispatch({type: 'previous'})
    }

    const handleRepeat = () => {
        props.dispatch({type: 'loop'})
        audio.play()
    }

    useEffect(() => {
        setAudio(document.querySelector('#dashboard audio'))
        setProgress(document.querySelector('#dashboard input.progress'))
        document.onscroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            let thumbSize = Math.max(240 - scrollTop, 0)

            const thumb = document.querySelector("#dashboard .cd img")

            thumb.style.width = thumbSize + 'px'
            thumb.style.height = thumbSize + 'px'
            thumb.style.margin = thumbSize / 15 + 'px auto'
            thumb.style.opacity = thumbSize / 240
        }
    }, [])

    useEffect(() => {
        if (!paused) document.querySelector('#dashboard audio').play()
    }, [props.index, paused])

    return (
        <Board id='dashboard' thumbSize={props.thumbSize}>
            <div className='header'>
                <h4>Now playing</h4>
                <h2>{props.name}</h2>
            </div>
            <div className='cd'>
                <img src={props.image || thumb} alt=''/>
            </div>

            <div className='controls'>
                {loop? <div className="btn btn-repeat on" onClick={toggleLoop}>
                    <i className="fas fa-redo"></i>
                </div> : <div className="btn btn-repeat" onClick={toggleLoop}>
                    <i className="fas fa-redo"></i>
                </div>}
                <div className="btn btn-prev" onClick={handlePrevious}>
                    <i className="fas fa-step-backward"></i>
                </div>
                <div className="btn btn-toggle-play" onClick={togglePlay}>
                    {paused? <i className="fas fa-play icon-play"></i> : <i className="fas fa-pause icon-pause"></i>}
                </div>
                <div className="btn btn-next" onClick={handleNext}>
                    <i className="fas fa-step-forward"></i>
                </div>
                {shuffle? <div className="btn btn-random on" onClick={toggleShuffle}>
                    <i className="fas fa-random"></i>
                </div> : <div className="btn btn-random" onClick={toggleShuffle}>
                    <i className="fas fa-random"></i>
                </div>}
            </div>

            <input className="progress" name='progress' onInput={handleProgress} type="range" min="0" max="1000" defaultValue='0'/>

            <audio src={props.url} 
                onTimeUpdate={() => {
                    progress.value = audio.currentTime / audio.duration * progress.max
                    progress.style.backgroundSize = progress.value * 100 / progress.max + '% 100%'}}
                onEnded={loop? handleRepeat : handleNext}

                onError={handleNext}
            />
        </Board>
    )
}

const Board = styled.div`
    width: 480px;
    max-width: 100%;
    position: fixed;
    top: 0; left: auto; right: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;

    .header {
        text-align: center;
    }

    h4 {
        color: var(--main-color);
    }

    .cd {

        img {
            margin: 16px auto;
            object-fit: cover;
            width: 240px;
            height: 240px;
            border-radius: 50%;
            animation: rotating linear 20s infinite;
        }

        @keyframes rotating {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    }

    .controls {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .btn-toggle-play {
            background-color: var(--main-color);
            height: 56px;
            width: 56px;
            border-radius: 50%;

            display: flex;
            justify-content: center;
            align-items: center;
        }

        .btn.on {
            color: var(--main-color);
        }

        .btn {
            cursor: pointer;
        }

        .btn:hover {
            color: var(--main-color);
        }

        .btn-toggle-play:hover {
            color: unset;
        }
    }

    .progress {
        -webkit-appearance: none;
        margin-top: 16px;
        width: 100%;
        background: rgba(255, 255, 255, 0.6);
        background-image: linear-gradient(var(--main-color), var(--main-color));
        background-size: 0% 100%;  background-repeat: no-repeat;

    }

    .progress::-webkit-slider-runnable-track {
        height: 2px;
    }

    .progress::-webkit-slider-thumb {
        -webkit-appearance: none;
        margin-top: -5px;
        height: 12px;
        width: 12px;
        border-radius: 6px;
        background: var(--main-color);
    }
    
`