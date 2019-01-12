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
//   state = {
//     allFilterData:[]
//   }
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

    convertMSToUniqueMonth = ms => Number(moment(ms).format("YYYY")) * 12 + Number(moment(ms).format("M"))

    convertMSToUniqueDate = ms => Number(moment(ms).format("YYYY")) * 365 + Number(moment(ms).format("M")) * 31 + Number(moment(ms).format("D"))

    convertUmonthToAllticks = mm => mm%12?`${mm%12} ${parseInt(mm/12)}`:`${12} ${mm/12-1}`   

render() {

  const data = this.props.data;
  var xTicks = data.map(item => item.x)
  var graphData = data
  if (this.props.filter === 'All' || this.props.filter === 'Year' ) {
    var xAllTicks = _.uniq(xTicks.map(item => this.convertMSToUniqueMonth(item)))
    var allFilterData = [] 
    xAllTicks.forEach(month=>{
      var result = {}
      var sum = 0;
      var count = 0;
      data.forEach(item=>{
          let month_uniq = this.convertMSToUniqueMonth(item.x)
  
          if (month == month_uniq) {
              sum += item.y;
              count += 1;
          }
      })    
      const weight = sum/count
      result.x = month
      result.y = weight
      allFilterData.push(result)
    })
    graphData = allFilterData
  }

  
  return (
    <VictoryChart
      // theme={VictoryTheme.material}
      animate={{ duration: 500 }}
      domain={{y: [0, 300]}}
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
        data={graphData} //this.props.data
      />

        <VictoryAxis dependentAxis crossAxis
            tickValues={[0,50,100,150,200,250,300]}
            tickFormat={(t) => `${Math.round(t)}lb`}
            tickLabelComponent={<VictoryLabel dx={0}/>}
        />
        {(this.props.filter !== 'All' && this.props.filter !== 'Year') ?
        <VictoryAxis crossAxis
            offsetX={100}
            tickValues={xTicks}
            tickFormat={(t) => this.convertMSToXAxis(t, this.props.filter)}
            tickLabelComponent={<VictoryLabel dy={10}/>}
        />
        :
        <VictoryAxis crossAxis
            offsetX={100}
            tickValues={xAllTicks}
            tickFormat={(t) => this.convertUmonthToAllticks(t)}
            tickLabelComponent={<VictoryLabel dy={10}/>}
        />}  
      {(this.props.filter !== 'All' && this.props.filter !== 'Year') &&
      <VictoryScatter
        data={graphData} //this.props.data
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
            if ((this.props.filter !== 'All' && this.props.filter !== 'Year'))
            this.props.onClickPoint(pointData)
           }
        }
      }]}
     /> 
    }   
    </VictoryChart>
  );
}}