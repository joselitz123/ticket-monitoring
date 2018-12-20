import { LOAD_APP_TOTAL_TICKET_COUNT, SET_ACTIVE_INDEX } from '../../actions/home/actionTypes';

const initialState = {
    data: [],
    activeIndex: 0,
    cellColors: [
        '#DB504A',
        '#FF6F59',
        '#254441',
        '#43AA8B',
        '#B2B09B',
        '#FF715B',
        '#F9CB40',
        '#BCED09',
        '#2F52E0',
        '#6457A6',
        '#76E5FC',
        '#5C2751',
        '#B49594',
        '#567568',
        '#D5DFE5',
        '#9649CB',
        '#D3FFF3',
        '#F6D8AE',
        '#F4D35E',
    ]
}

export default function setAppTicketCount(state = initialState, action){
    
    switch (action.type){
        case LOAD_APP_TOTAL_TICKET_COUNT:

            return {...state, data: action.payload}
        
        case SET_ACTIVE_INDEX:

            return {...state, activeIndex: action.payload}

        default:
            return state;
    }

}