import { TOGGLE_TICKET_DETAIL_MODAL, SET_FETCHED_DATA, TOGGLE_FETCHING_TICKET_DETAIL_ICON } from '../../../../actions/home/modals/ticketDetailModal/actionTypes';

const initialState = {
    modal_visibility: false,
    is_fetching_data: false,
    data: {
        application: "GMIP",
        ass_group: "HPE_BI_BIOPS_L1",
        ass_to: "JoseLito Phala",
        auto_tckt: false,
        conf_item: "GMIP (Global Manufacturing Intelligence Portal)",
        priority: "3 - Moderate",
        shrt_desc: "HHC-VAL-GMIP GMIP [ASIA]: Request to cofigure line VAL-LINE 17 and VAL-LINE 19",
        status: "Work in Progress",
        task_type: "Requested Item",
        tckt_nmbr: "RITM1007694",
        updated: "2019-05-02 23:18:11",
        updated_at: "2019-05-02T16:00:00.000Z",
        updated_by: "t.n.3",
        _id: "5ccb911590664242cce1bc50"
    },
}


export default function ticketDetailsReducer(state = initialState, action) {

    switch (action.type) {
        
        case TOGGLE_TICKET_DETAIL_MODAL:

            return { ...state, modal_visibility: action.payload }

        case SET_FETCHED_DATA: 

            return {...state, data: action.payload}

        case TOGGLE_FETCHING_TICKET_DETAIL_ICON:

            return {...state, is_fetching_data: action.payload}

        default:

            return state;

    }

}