import { POPULATE_LOGGEDIN_USER } from '../../actions/sidebar/actionTypes';


const initialState = {
    accountName: 'Please login firsts',
    accountShortName: ''
}


export default function setUserName(state = initialState, action){
    switch (action.type) {
        case POPULATE_LOGGEDIN_USER:
            return {...state, accountName: action.payload.name, accountShortName: action.payload.shortname}
        default:
            return state;
    }
}