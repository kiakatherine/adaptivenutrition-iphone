import React, { Component } from "react";
import _ from "lodash"
import moment from 'moment'
import {
VictoryAxis,
VictoryChart,
VictoryArea,
VictoryScatter,
VictoryLabel,
} from "victory-native";

const Days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
export default class Chart extends Component {
    changeData(index){
    var tempData = this.state.data;
    tempData.splice(-1,1);
    console.log(tempData)
    this.setState({ data: tempData });
    }

    convertMSToXAxis(ms, filter) {
        switch (filter) {
            case 'Week':
                return moment(ms).format("ddd");
            case 'Month':
                return moment(ms).format("D");
            case 'Year':
                return moment(ms).format("MMM");
            case 'All':
                return moment(ms).format("M YYYY");
            default:
            break;
        }
    }
render() {
  const data = this.props.data;
  var xTicks = data.map(item => item.x)
  console.log(xTicks)
  return (
    <VictoryChart
      // theme={VictoryTheme.material}
      animate={{ duration: 500 }}
      domain={{y: [0, 100]}}
      // domainPadding={{x: [10, -10], y: 5}}
      //padding={{ top:50, left: 0, right: -10 }}
    >
      <VictoryArea
        interpolation="natural"
        style={{
          data: {
            fill: "#c43a31", fillOpacity: 0.7, stroke: "#c43a31", strokeWidth: 3
          }
        }}
        data={this.props.data}
      />

        <VictoryAxis dependentAxis crossAxis
            tickValues={[0, 100]}
            tickFormat={(t) => `${Math.round(t)}lb`}
            tickLabelComponent={<VictoryLabel dx={0}/>}
        />
        <VictoryAxis crossAxis
            offsetX={100}
            tickValues={xTicks}
            tickFormat={(t) => this.convertMSToXAxis(t, this.props.filter)}
            tickLabelComponent={<VictoryLabel dy={10}/>}
        />
      <VictoryScatter
        data={this.props.data}
        size={5}
        symbol={"circle"}
        style={{
        data: {
          fill: "gold",
          stroke: "orange",
          strokeWidth: 3
        }
      }}

      events={[{
        eventHandlers: {
          onPressIn: (props, evt, eventKey, eventName) => {
            const weight = data[evt.index].y
            const date = data[evt.index].date
            var pointData = { weight, date }

            this.props.onClickPoint(pointData)
           }
        }
      }]}
         />        
    </VictoryChart>
  );
}}