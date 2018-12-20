import React, { Component } from 'react';
import { Sector, Cell ,ResponsiveContainer, Legend, PieChart, Pie } from 'recharts';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadAppTicketCount, setActiveIndex } from '../../actions/home/doughnutActions';
import io from 'socket.io-client';


/**
 * DOM content for the ticket Doughnut Graph
 */

class DoughnutGraph extends Component{

      componentDidMount(){

        const socket = io.connect('http://localhost:3000/doughnut_dashboard');

        socket.on('app_total_count', data=>{

            this.props.loadAppTicketCount(data);

        });

      }
    
      shouldComponentUpdate(nextProps, nextState){

        if (this.props.appData !== nextProps.appData) {

            return true;

        }

        if (this.props.activeIndex !== nextProps.activeIndex) {

            return true;

        }

        return false
      }
   

        renderActiveShape(props){
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
            fill, payload, percent, value } = props;

        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';
        return (
            <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill='#8b92a9'>{payload.app_name}</text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#8b92a9">{`Ticket: ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#8b92a9">
                {`(${(percent * 100).toFixed(2)}%)`}
            </text>
            </g>
        );
        };

        render(){

            

            return (
                <div className="col-lg-6 col-md-12">
                    <div className="card">
                        <div className="card-header card-header-primary">
                            <h4 className="card-title">Ticket Doughnut Graph</h4>
                        </div>
                        <div className="card-body">
                            <ResponsiveContainer width="100%" height={400} >
                                <PieChart >
                                    <Pie data={this.props.appData} activeShape={this.renderActiveShape} activeIndex={this.props.activeIndex} dataKey="total_tickets" nameKey="app_name" cx="50%" cy="50%" innerRadius={50}  outerRadius={120} onMouseEnter={this.props.setActiveIndex} >
                                        {this.props.appData.map((data, index)=>{

                                            return <Cell key={`cell-${index}`} fill={this.props.fillColor[index]} stroke="#202940" />

                                        })}
                                    </Pie>
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            );
        }
    

}




const mapStateToProps = state =>({
    appData: state.setAppTicketCount.data,
    activeIndex: state.setAppTicketCount.activeIndex,
    fillColor: state.setAppTicketCount.cellColors
});

DoughnutGraph.propTypes = {
    appData: PropTypes.array.isRequired,
    fillColor: PropTypes.array.isRequired,
    loadAppTicketCount: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { loadAppTicketCount, setActiveIndex })(DoughnutGraph);
