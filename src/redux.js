import * as redux from 'redux';

const rootReducer = (state = 0, action) => {
    switch (action.type) {
        case 'tang':
            return ++state;
        case 'giam': 
            return --state;
        case 'click':
            return action.clickSong;
        case 'max':
            return 0
        case 'min':
            return action.dataLength - 1
        case 'repeat':
            return action.repeat
        case 'random':
            return action.random
        default: 
            return state
    }
}

const store = redux.createStore(rootReducer)

export default store
