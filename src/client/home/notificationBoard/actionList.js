import React from 'react';
import PropTypes from 'prop-types';

const ActionList = ({action_list}) => {

    return action_list.map(list => (
        <tr key={list.notif_id}>
            <td>
                <div className="form-check">
                <label className="form-check-label">
                    <input className="form-check-input" type="checkbox" value=""  />
                    <span className="form-check-sign">
                        <span className="check"></span>
                    </span>
                </label>
                </div>
            </td>
            <td>{list.notif}</td>
            <td className="td-actions text-right">
                <button type="button" rel="tooltip" title="" className="btn btn-white btn-link btn-sm" data-original-title="Edit Task">
                <i className="material-icons">edit</i>
                </button>
                <button type="button" rel="tooltip" title="" className="btn btn-white btn-link btn-sm" data-original-title="Remove">
                <i className="material-icons">close</i>
                </button>
            </td>
        </tr>
    ))
}

ActionList.propTypes = {
    action_list: PropTypes.array.isRequired
}

export default ActionList;