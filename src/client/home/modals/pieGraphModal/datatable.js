import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import $ from 'jquery';
$.DataTable = require('datatables.net-jqui');


class DataTable extends Component  {

    constructor(props) {
        super(props);

        this.appTable = createRef();
        this.state = {
            tableInstance: ''
        }
    }

    componentDidMount() {

        // const data = JSON.stringify({data: this.props.appTickets || []});

        const dataTable = $(this.appTable.current).DataTable({
            data: [],
            columns: [
                {data: 'tckt_nmbr'},
                {data: 'shrt_desc'},
                {data: 'priority'},
                {data: 'status'},
                {data: 'ass_to'},
                {data: 'ass_group'}
            ]
        });


        this.setState(state => {
            return {tableInstance: dataTable}});
    }

    render() {
        
        const tableInstance = this.state.tableInstance;

        if (tableInstance != '' && this.props.modalVisibility == true) {
            tableInstance.clear();
        }

        if (tableInstance != '') {

            console.log(tableInstance);
            tableInstance.rows.add(this.props.appTickets).draw();

        }

        return (
            <table id="app_table"  ref={this.appTable} className="display" style={{width: '100%'}} >
                <thead>
                    <tr>
                        <th>Ticket #</th>
                        <th>Short Description</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Assigned To</th>
                        <th>Assigned Group</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th>Ticket #</th>
                        <th>Short Description</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Assigned To</th>
                        <th>Assigned Group</th>
                    </tr>
                </tfoot>
            </table>    
        )
    }
    
}

const mapStateToProps = state => ({
    appTickets: state.setPieGraphTableData.app_tickets,
    modalVisibility: state.toggleModalForPieGraph.modal_visibility
})

DataTable.propTyps = {
    appTickets: PropTypes.array.isRequired
}

export default connect(mapStateToProps, null)(DataTable);