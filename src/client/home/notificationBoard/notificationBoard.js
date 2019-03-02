import React from 'react';
import NotifList from './notifList';
        

const NotificationBoard = () => {

    return (
        <div className="col-lg-6 col-md-12">
            <div className="card">
                <div className="card-header card-header-primary">
                <h4 className="card-title">For your Attention / Action</h4>
                <p className="card-category">Please check the following below for any action needed.</p>
                </div>
                <div className="card-body table-responsive">
                    <div className="accordion" id="ticketNotifAcc">
                        <NotifList  />
                    </div>
                </div>
            </div>
        </div>
    )

}


export default NotificationBoard;