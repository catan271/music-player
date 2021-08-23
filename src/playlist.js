import React from 'react'
import styled from 'styled-components'
import thumb from './img/music-icon-default.jpg'
import { store } from './App'

export default function Playlist(props) {

    return (
        <PlayList id='playlist'>
            {props.list.map((song, index) => {
                const nameOfClass = 'song' + (index === props.index? ' selected' : '')
                return (
                    <div className={nameOfClass} key={index}
                        onClick={() => {
                            store.dispatch({
                                type: 'pick',
                                index,
                            })
                        }}
                    >
                        <img src={song.image || thumb} alt=''/>
                        <div className='info'> 
                            <h4>{song.name}</h4>
                            <p>{song.artist}</p>
                        </div>
                    </div>
                )
            })}
        </PlayList>
    )
}

const PlayList = styled.div`
    margin-top:  412px;
    padding: 12px;
    width: 480px;
    max-width: 100%;

    .song {
        margin-top: 12px;
        width: 100%;        
        background-color: #fff;
        padding: 12px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
        
        img {
            height: 40px;
            width: 40px;
            border-radius: 50%;
        }
    }

    .song.selected {
        background-color: var(--main-color);
    }
`