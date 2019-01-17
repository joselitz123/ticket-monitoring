import { SHOW_MODAL, HIDE_MODAL } from '../../../../actions/home/doughnutGraphActions/actionTypes';


const initialState = {
    modal_visibility: false
}

export default function toggleModal(state = initialState, action){

    switch (action.type) {
        case SHOW_MODAL:
            return {...state, modal_visibility: action.payload}
        
        case HIDE_MODAL:
            return {...state, modal_visibility: action.payload}

        default:
            return state;
    }

    
}