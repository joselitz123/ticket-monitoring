import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ActionList from './actionList';

const NotifList = ({data}) =>(

    data.map(data => 
        (
           <div key={data._id} className="card">
               <div className="card-header" id="headingOne">
               <h2 className="mb-0">
                   <button className="btn btn-link" type="button" data-toggle="collapse" data-target={`#${data._id}`} aria-expanded="false" aria-controls={data._id}>
                   {`${data._id}: ${data.ticket_details.shrt_desc}`}
                   </button>
               </h2>
               </div>

               <div id={data._id} className="collapse" aria-labelledby="headingOne" data-parent="#ticketNotifAcc">
               <div className="card-body">
                   <div className="tab-content">
                       <div className="tab-pane active" id="profile">
                           <table className="table">
                               <tbody>
                                   <ActionList action_list={data.notifications} />
                               </tbody>
                           </table>
                       </div>
                   </div>
               </div>
               </div>
           </div>
       )

   )
);

NotifList.propTypes = {
    data: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    data: state.ticketNotifTableReducer.data
})



export default connect(mapStateToProps)(NotifList);