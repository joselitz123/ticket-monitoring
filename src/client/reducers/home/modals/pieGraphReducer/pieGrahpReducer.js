import { SHOW_MODAL, HIDE_MODAL, SET_APPLICATION } from '../../../../actions/home/doughnutGraphActions/actionTypes';


const initialState = {
    modal_visibility: false,
    modal_name: '',
    application_id: '',
}

export default function toggleModalForPieGraph(state = initialState, action){

    switch (action.type) {
        case SHOW_MODAL:
            return {...state, modal_visibility: action.payload}
        
        case HIDE_MODAL:
            return {...state, modal_visibility: action.payload}

        case SET_APPLICATION:
            return {...state, modal_name: action.payload.app_name, application_id: action.payload._id}

        default:
            return state;
    }

    
}