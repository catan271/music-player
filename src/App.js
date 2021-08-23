import React from 'react'
import Dashboard from './playing'
import Playlist from './playlist'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

const list = [
    {
        name: 'Into the night',
        artist: 'YOASOBI',
        image: 'https://cdn-japantimes.com/wp-content/uploads/2021/08/np_file_105988-870x489.jpeg',
        url : 'https://drive.google.com/uc?export=view&id=1AgGUBxx1USLSU8o7JCGQheYGoHwFD6fm'
    },
    {
        name: 'Hooked on a feeling',
        artist: 'Blue Swede',
        image: 'https://i.ytimg.com/vi/NrI-UBIB8Jk/mqdefault.jpg',
        url: 'https://drive.google.com/uc?export=view&id=1H7MiuBR5ofRbdg7Mt2G3HrLrjEht_ehu'
    },
    {
        name: 'Reality',
        artist: 'Lost Frequencies',
        image: 'https://melodicpop.com/build/images/artists/lost-frequencies.png',
        url: 'https://drive.google.com/uc?export=view&id=1WUy8BlH4gw8kQ72knJdzwtBSKKpLumOz'
    },
    {
        name: 'Believer',
        artist: 'Imagine Dragons',
        image: 'https://i1.sndcdn.com/artworks-s3zOCWcV8XQVtQcv-0emq8A-t500x500.jpg',
        url: 'https://drive.google.com/uc?export=view&id=18Th6PJCf-0JrkSdIYQ5_epeLSxgNGqRv'
    },
    {
        name: 'This girl',
        artist: 'Kungs vs Cookin’ on 3 Burner',
        image: 'https://i1.sndcdn.com/artworks-000146780072-z8inm0-t500x500.jpg',
        url: 'https://drive.google.com/uc?export=view&id=1rA7nX4hJcqi-PpBQAemkVZnLZxk3x0AY'
    },
    {
        name: 'Counting Stars',
        artist: 'OneRepublic',
        image: 'https://i1.sndcdn.com/artworks-000040814493-eu3kr3-t500x500.jpg',
        url: 'https://drive.google.com/uc?export=view&id=1T_Ro100XjNMnnIOcywTX5KnLIYXRFADR'
    },
    {
        name: 'Adventure of a lifetime',
        artist: 'Coldplay',
        image: 'https://i1.sndcdn.com/artworks-YEwXu5sQShwND3Rc-r1FSRw-t500x500.jpg',
        url: 'https://drive.google.com/uc?export=view&id=1CrCnTFEk9ATSQ-dAKYWMzu4rzz60eC1F'
    },
    {
        name: 'Something Just Like This',
        artist: 'The Chainsmokers & Coldplay',
        image: 'https://upload.wikimedia.org/wikipedia/vi/5/57/Something_Just_Like_This.png',
        url: 'https://drive.google.com/uc?export=view&id=1C1W8AJpTcZldKAMVhIEHrZVh_idd2OvH'
    }
]

let index = 0

const Reducer = (state = list[index], action) => {
    switch (action.type) {
        case 'pick':
            index = action.index
            break
        case 'next':
            index++
            if (index === list.length) index = 0
            break
        case 'shuffle':
            let newIndex = Math.floor(Math.random() * (list.length - 0.01))
            while (newIndex === index) newIndex = Math.floor(Math.random() * (list.length - 0.01))
            index = newIndex
            break
        case 'loop':
            index = state.index
            break
        default:
            index = 0
    }
    return {...list[index], index}
}

export const store = createStore(Reducer)

const DashboardContainer = connect((state) => state, (dispatch) => {return {dispatch}})(Dashboard)
const PlaylistContainer = connect((state) => state, (dispatch) => {return {dispatch}})(Playlist)

export default function App() {
    return (
        <div id="player">
            <Provider store={store}>
                <DashboardContainer/>
            </Provider>
            <Provider store={store}>
                <PlaylistContainer list={list}/>
            </Provider>
        </div>
    )
}