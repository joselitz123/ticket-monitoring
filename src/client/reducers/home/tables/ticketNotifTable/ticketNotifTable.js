import { POPULATE_DATA, SET_SELECTED_TICKET_ID } from '../../../../actions/home/ticketNotif/actionTypes';

const initialState = {
    data: [
        {
            "_id": "INC2764029",
            "notifications": [
             {
              "notif": "This needs to be updated now as this was last updated on February 28, 2019 and is in Awaiting User Info status",
              "notif_id": "5c6f538029fe1032b0a6e3f6"
             }
            ],
            "ticket_details": {
             "_id": "5c780743e085a52554765d5a",
             "user_id": "5bd6221d4dade63138a5c0c5",
             "updated_at": "2019-02-28T16:00:00.000Z",
             "tckt_nmbr": "INC2764029",
             "task_type": "Incident",
             "conf_item": "Selling Content (formerly Customer Online)",
             "app_id": "5c0894b10d1d233558a179ec",
             "status_id": "5c42a50367325d2b7cadaf60",
             "ticket_priority_id": "5be8c1d542fb693788010d64",
             "ass_to": "CharlesLonarm Sim",
             "ass_group": "HPE_CDS_CustomerOnline_L2",
             "shrt_desc": "CO [NA] No accounts can be pulled",
             "auto_tckt": false,
             "updated": "2019-02-28 22:08:38",
             "updated_by": "sim.ch",
             "__v": 0,
             "priority": "3 - Moderate",
             "application": "Customer Online",
             "status": "Awaiting User Info"
            }
           },
           {
            "_id": "RITM1001093",
            "notifications": [
             {
              "notif": "This new autoticket is now assigned to you",
              "notif_id": "5c6f538029fe1032b0a6e3f8"
             },
             {
              "notif": "Is now currently assigned to your team",
              "notif_id": "5c6f538029fe1032b0a6e3f7"
             }
            ],
            "ticket_details": {
             "_id": "5c780743e085a52554765d5f",
             "user_id": "5bd6221d4dade63138a5c0c5",
             "updated_at": "2019-02-28T16:00:00.000Z",
             "tckt_nmbr": "RITM1001093",
             "task_type": "Requested Item",
             "conf_item": "ICCSR",
             "app_id": "5c0894b10d1d233558a179de",
             "status_id": "5c42a50367325d2b7cadaf63",
             "ticket_priority_id": "5be8c1d542fb693788010d64",
             "ass_to": "JoseLito Phala",
             "ass_group": "HPE_BI_BIOPS_L1",
             "shrt_desc": "ICCSR OBIEE Fulfillment Request Form",
             "auto_tckt": true,
             "updated": "2019-02-28 02:24:34",
             "updated_by": "phala.jl",
             "__v": 0,
             "priority": "3 - Moderate",
             "application": "ICCSR",
             "status": "Pending"
            }
           },
           {
            "_id": "INC2724028",
            "notifications": [
             {
              "notif": "Is now currently assigned to your team",
              "notif_id": "5c6f538029fe1032b0a6e3f7"
             }
            ],
            "ticket_details": {
             "_id": "5c780743e085a52554765d58",
             "user_id": "5bd6221d4dade63138a5c0c5",
             "updated_at": "2019-02-28T16:00:00.000Z",
             "tckt_nmbr": "INC2724028",
             "task_type": "Incident",
             "conf_item": "WorldWide Market Data (WWMD)",
             "app_id": "5c0894b10d1d233558a179e3",
             "status_id": "5c42a50367325d2b7cadaf62",
             "ticket_priority_id": "5be8c1d542fb693788010d64",
             "ass_to": "JoseLito Phala",
             "ass_group": "HPE_BI_BIOPS_L1",
             "shrt_desc": "[WWMD] [GLOBAL] - Error encountered in Active Data console",
             "auto_tckt": false,
             "updated": "2019-02-27 20:44:57",
             "updated_by": "eyana.cb",
             "__v": 0,
             "priority": "3 - Moderate",
             "application": "WWMD",
             "status": "Resolved"
            }
           },
           {
            "_id": "INC2536834",
            "notifications": [
             {
              "notif": "This needs to be updated now as this was last updated on February 27, 2019 and is in Awaiting Evidence status",
              "notif_id": "5c6f538029fe1032b0a6e3f6"
             },
             {
              "notif": "Is now currently assigned to your team",
              "notif_id": "5c6f538029fe1032b0a6e3f7"
             }
            ],
            "ticket_details": {
             "_id": "5c780743e085a52554765d56",
             "user_id": "5bd6221d4dade63138a5c0c5",
             "updated_at": "2019-02-28T16:00:00.000Z",
             "tckt_nmbr": "INC2536834",
             "task_type": "Incident",
             "conf_item": "GMIP (Global Manufacturing Intelligence Portal)",
             "app_id": "5c0894b10d1d233558a179e1",
             "status_id": "5c42a50367325d2b7cadaf61",
             "ticket_priority_id": "5be8c1d542fb693788010d64",
             "ass_to": "JoseLito Phala",
             "ass_group": "HPE_BI_BIOPS_L1",
             "shrt_desc": "HHC-VAL-GMIP GMIP [EMEA]: Data autoload not working",
             "auto_tckt": false,
             "updated": "2019-02-27 23:59:54",
             "updated_by": "phala.jl",
             "__v": 0,
             "priority": "3 - Moderate",
             "application": "GMIP",
             "status": "Awaiting Evidence"
            }
           },
           {
            "_id": "RITM0995524",
            "notifications": [
             {
              "notif": "This needs to be updated now as this was last updated on February 26, 2019 and is in Work in Progress status",
              "notif_id": "5c6f538029fe1032b0a6e3f6"
             }
            ],
            "ticket_details": {
             "_id": "5c780743e085a52554765d5d",
             "user_id": "5bd6221d4dade63138a5c0c5",
             "updated_at": "2019-02-28T16:00:00.000Z",
             "tckt_nmbr": "RITM0995524",
             "task_type": "Requested Item",
             "conf_item": "Selling Content (formerly Customer Online)",
             "app_id": "5c0894b10d1d233558a179ec",
             "status_id": "5c42a50367325d2b7cadaf67",
             "ticket_priority_id": "5be8c1d542fb693788010d64",
             "ass_to": "Dominique Abadilla",
             "ass_group": "HPE_CDS_CustomerOnline_L2",
             "shrt_desc": "[CO] [NA] Access request to Coborn retailer",
             "auto_tckt": false,
             "updated": "2019-02-28 04:55:30",
             "updated_by": "abadilla.d",
             "__v": 0,
             "priority": "3 - Moderate",
             "application": "Customer Online",
             "status": "Completed"
            }
           },
           {
            "_id": "INC2517964",
            "notifications": [
             {
              "notif": "This needs to be updated now as this was last updated on February 28, 2019 and is in Resolved status",
              "notif_id": "5c6f538029fe1032b0a6e3f6"
             }
            ],
            "ticket_details": {
             "_id": "5c780743e085a52554765d55",
             "user_id": "5bd6221d4dade63138a5c0c5",
             "updated_at": "2019-02-28T16:00:00.000Z",
             "tckt_nmbr": "INC2517964",
             "task_type": "Incident",
             "conf_item": "Data Direct Solution",
             "app_id": "5c0899587284f825e082282d",
             "status_id": "5c42a50367325d2b7cadaf62",
             "ticket_priority_id": "5be8c1d542fb693788010d64",
             "ass_to": "Rafal Lachowicz",
             "ass_group": "HPE_ITS_DV_Data_Fabric_Developers",
             "shrt_desc": "[DATA DIRECT] Unsresolved data refresh in INC2457789",
             "auto_tckt": false,
             "updated": "2019-02-28 20:23:06",
             "updated_by": "lachowicz.rl",
             "__v": 0,
             "priority": "3 - Moderate",
             "application": "Others",
             "status": "Resolved"
            }
           },
           {
            "_id": "RITM0998901",
            "notifications": [
             {
              "notif": "This needs to be updated now as this was last updated on February 27, 2019 and is in Registered status",
              "notif_id": "5c6f538029fe1032b0a6e3f6"
             }
            ],
            "ticket_details": {
             "_id": "5c780743e085a52554765d5e",
             "user_id": "5bd6221d4dade63138a5c0c5",
             "updated_at": "2019-02-28T16:00:00.000Z",
             "tckt_nmbr": "RITM0998901",
             "task_type": "Requested Item",
             "conf_item": "ECM - Customer Portal Genesis Two (CPGT)",
             "app_id": "5c0899587284f825e082282d",
             "status_id": "5c42a50367325d2b7cadaf64",
             "ticket_priority_id": "5be8c1d542fb693788010d64",
             "ass_to": "(empty)",
             "ass_group": "HPE_CDS_CPGT_L2L3",
             "shrt_desc": "[CPGT][NA]: Request to reset password",
             "auto_tckt": false,
             "updated": "2019-02-27 05:49:26",
             "updated_by": "phala.jl",
             "__v": 0,
             "priority": "3 - Moderate",
             "application": "Others",
             "status": "Registered"
            }
           },
           {
            "_id": "INC2706032",
            "notifications": [
             {
              "notif": "Is now currently assigned to your team",
              "notif_id": "5c6f538029fe1032b0a6e3f7"
             }
            ],
            "ticket_details": {
             "_id": "5c780743e085a52554765d57",
             "user_id": "5bd6221d4dade63138a5c0c5",
             "updated_at": "2019-02-28T16:00:00.000Z",
             "tckt_nmbr": "INC2706032",
             "task_type": "Incident",
             "conf_item": "STEAM",
             "app_id": "5c0894b10d1d233558a179f0",
             "status_id": "5c42a50367325d2b7cadaf62",
             "ticket_priority_id": "5be8c1d542fb693788010d64",
             "ass_to": "JoseLito Phala",
             "ass_group": "HPE_BI_BIOPS_L1",
             "shrt_desc": "[STEAM] [NA]: Automatically sends feedback after signing a document",
             "auto_tckt": false,
             "updated": "2019-02-26 18:04:00",
             "updated_by": "sequina.hr",
             "__v": 0,
             "priority": "3 - Moderate",
             "application": "STEAM",
             "status": "Resolved"
            }
           }
    ],
    selectedTicketID: '',
}

export default function ticketNotifTableReducer(state = initialState, action) {

    switch (action.type) {

        case POPULATE_DATA:

            return {
                ...state, data: action.payload
            }

        case SET_SELECTED_TICKET_ID:

            return {
                ...state, selectedTicketID: action.payload
            }
    
        default: 
            
            return state;

    }

}