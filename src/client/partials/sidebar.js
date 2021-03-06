import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { alterCurrentUsername } from '../actions/sidebar/actions';
import PropTypes from 'prop-types';
import io from 'socket.io-client';


class Sidebar extends Component {

    componentDidMount() {

        const { alterCurrentUsername } = this.props;

        const socket = io.connect('http://localhost:3000/user_acc');

        socket.on('user_acc', data => {

            alterCurrentUsername(JSON.parse(data));

        });

    }


    render() {

        const { user } = this.props;

        return (
            <div className="sidebar" data-color="purple" data-background-color="black" data-image="assets/img/sidebar-2.jpg">
                <div className="logo">
                    <a href="#" className="simple-text logo-normal">
                        {user}
                    </a>
                </div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        <li className="nav-item active  ">
                            <a className="nav-link" href="./dashboard.html">
                                <i className="material-icons">dashboard</i>
                                <p>Dashboard</p>
                            </a>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link" href="./user.html">
                                <i className="material-icons">person</i>
                                <p>User Profile</p>
                            </a>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link" href="./tables.html">
                                <i className="material-icons">content_paste</i>
                                <p>Table List</p>
                            </a>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link" href="./typography.html">
                                <i className="material-icons">library_books</i>
                                <p>Typography</p>
                            </a>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link" href="./icons.html">
                                <i className="material-icons">bubble_chart</i>
                                <p>Icons</p>
                            </a>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link" href="./map.html">
                                <i className="material-icons">location_ons</i>
                                <p>Maps</p>
                            </a>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link" href="./notifications.html">
                                <i className="material-icons">notifications</i>
                                <p>Notifications</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )

    }

}



Sidebar.propTypes = {
    user: PropTypes.string.isRequired,
    alterCurrentUsername: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.setUserName.accountName,
})


export default connect(mapStateToProps, { alterCurrentUsername })(Sidebar);