import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ActionList = ({action_list}) => {

    return action_list.map(list => (
        <tr key={list.notif_id}>
            {/* <td>
                <div className="form-check">
                <label className="form-check-label">
                    <input className="form-check-input" type="checkbox" value="" checked={true} />
                    <span className="form-check-sign">
                        <span className="check"></span>
                    </span>
                </label>
                </div>
            </td> */}
            <td className="td-actions text-right">
                <button type="button" rel="tooltip" title="" className="btn btn-white btn-link btn-sm" data-original-title="Dismiss">
                <i className="material-icons">clear</i>
                </button>
            </td>
            <td>{list.notif}</td>            
        </tr>
    ))
}

ActionList.propTypes = {
    action_list: PropTypes.array.isRequired
}

export default connect(null, {  })(ActionList);