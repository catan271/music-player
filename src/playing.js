import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import thumb from './img/music-icon-default.jpg'

export default function Dashboard(props) {
    const [paused, setPaused] = useState(true)

    const togglePlay = () => {
        setPaused(!paused)
    }

    const handleProgress = (e) => {
        const min = e.target.min
        const max = e.target.max
        const val = e.target.value
        
        e.target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
    }

    useEffect(() => {
        const target = document.querySelector('#dashboard input[type="range"]')
        target.value = 0;
    }, [])

    return (
        <Board id='dashboard'>
            <div className='header'>
                <h4>Now playing</h4>
                <h2>{props.name}</h2>
            </div>
            <div className='cd'>
                <img src={props.image || thumb} alt=''/>
            </div>

            <div className='controls'>
                <div className="btn btn-repeat">
                    <i className="fas fa-redo"></i>
                </div>
                <div className="btn btn-prev">
                    <i className="fas fa-step-backward"></i>
                </div>
                <div className="btn btn-toggle-play" onClick={togglePlay}>
                    {paused? <i className="fas fa-play icon-play"></i> : <i className="fas fa-pause icon-pause"></i>}
                </div>
                <div className="btn btn-next">
                    <i className="fas fa-step-forward"></i>
                </div>
                <div className="btn btn-random">
                    <i className="fas fa-random"></i>
                </div>
            </div>

            <input className="progress" name='progress' onInput={handleProgress} type="range" min="0" max="100"/>
        </Board>
    )
}

const Board = styled.div`
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
        width: 50%;

        img {
            width: 100%;
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

        .btn {
            cursor: pointer;
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
        width: 24px;
        border-radius: 6px;
        background: var(--main-color);
    }
    
`