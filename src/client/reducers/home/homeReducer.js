import { LOAD_TICKET_PRIORITY_COUNT } from '../../actions/home/actionTypes';

const initialState = {
    critical: 0,
    high: 0,
    moderate: 0,
    low: 0
}

export default function setPriorityTotal(state = initialState, action){
    
    switch (action.type){
        case LOAD_TICKET_PRIORITY_COUNT:

            return {...action.payload};
        
        default:
            return state;
    }

}