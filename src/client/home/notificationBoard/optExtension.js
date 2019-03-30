import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { hideOptions } from '../../actions/home/optExtension/ticketNotif/actions';

class OptExtension extends Component{

    constructor(props){
        super(props);

        this.addEvent = this.addEvent.bind(this);
        this.scrollHandler = this.scrollHandler.bind(this);
        this.removeEvent = this.removeEvent.bind(this);
    }

    addEvent(){

        window.addEventListener('scroll', this.scrollHandler, true);
        window.addEventListener('click', this.scrollHandler,true);

    }

    removeEvent(){

        window.removeEventListener('scroll', this.scrollHandler, true);
        window.removeEventListener('click', this.scrollHandler,true);

    }

    scrollHandler(){

        this.props.hideOptions();

    }

    render() {

        const {show, x_coord, y_coord} = this.props;

        show ? this.addEvent() : this.removeEvent();



        return (
            <div className="opt_extension" style={{
                'visibility': show == true ? 'visible' : 'hidden',
                'left': x_coord,
                'top': y_coord
                }}>
                <ul>
                    <a href="#"><li>View ticket details</li></a>
                    <a href="#"><li>View updates</li></a>
                    <a href="#"><li>Open ticket in browser</li></a>
                </ul>
            </div>
        );

    }
    
}

const mapStateToProps = state => ({
    show: state.ticketNotifOptExtension.show,
    x_coord: state.ticketNotifOptExtension.x_coord,
    y_coord: state.ticketNotifOptExtension.y_coord
});

OptExtension.propTypes = {
    show: PropTypes.bool.isRequired,
    x_coord: PropTypes.number.isRequired,
    y_coord: PropTypes.number.isRequired,
    hideOptions: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { hideOptions })(OptExtension);