import React from 'react';
import { Card } from 'antd';
import echartTheme from './../echartTheme';
// 按需加载
import echarts from 'echarts/lib/echarts' //核心组件
// 导入饼形图
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'

export default class Bar extends React.Component {
    componentWillMount() {
        echarts.registerTheme("roadhog", echartTheme);
    }
  
    getOptions() {
        let option = {
           title:{
               text:'用户骑行订单',
               x:'center'
           },
           legend:{
               orient:'vertical',
               data:["周一","周二","周三","周四","周五","周六","周日"],
            //    top:10,
               right:10,
            //    bottom:10
           },
           tooltip:{
               trigger:'item',
               formatter:'{a}<br/>{b}:{c}({d}%)'
           },
           series:{
               name:'订单量',
               type:'pie',
               
               data:[
               
                {
                    value:1000,
                    name:"周一"
                },
                {
                 value:2000,
                 name:"周二"
             },
             {
                 value:3000,
                 name:"周三"
             },
             {
                 value:1500,
                 name:"周四"
             },
             {
                 value:3000,
                 name:"周五"
             },
             {
                 value:2000,
                 name:"周六"
             },{
                 value:2300,
                 name:"周日"
             }
            ]
           }
        };
        return option;
    }
    getOptions2() {
        let option = {
           title:{
               text:'用户骑行订单',
               x:'center'
           },
           legend:{
               orient:'vertical',
               data:["周一","周二","周三","周四","周五","周六","周日"],
            //    top:10,
               right:10,
            //    bottom:10
           },
           tooltip:{
               trigger:'item',
               formatter:'{a}<br/>{b}:{c}({d}%)'
           },
           series:{
               name:'订单量',
               type:'pie',
               radius:["50%","80%"],
               data:[
               
                {
                    value:1000,
                    name:"周一"
                },
                {
                 value:2000,
                 name:"周二"
             },
             {
                 value:3000,
                 name:"周三"
             },
             {
                 value:1500,
                 name:"周四"
             },
             {
                 value:3000,
                 name:"周五"
             },
             {
                 value:2000,
                 name:"周六"
             },{
                 value:2300,
                 name:"周日"
             }
            ]
           }
        };
        return option;
    }
    getOptions3() {
        let option = {
           title:{
               text:'用户骑行订单',
               x:'center'
           },
           legend:{
               orient:'vertical',
               data:["周一","周二","周三","周四","周五","周六","周日"],
            //    top:10,
               right:10,
            //    bottom:10
           },
           tooltip:{
               trigger:'item',
               formatter:'{a}<br/>{b}:{c}({d}%)'
           },
           series:{
               name:'订单量',
               type:'pie',
               roseType: 'radius',
               data:[
               
                {
                    value:1000,
                    name:"周一"
                },
                {
                 value:2000,
                 name:"周二"
             },
             {
                 value:3000,
                 name:"周三"
             },
             {
                 value:1500,
                 name:"周四"
             },
             {
                 value:3000,
                 name:"周五"
             },
             {
                 value:2000,
                 name:"周六"
             },{
                 value:2300,
                 name:"周日"
             }
            ].sort(function (a, b) { return a.value - b.value; }),
           }
        };
        return option;
    }
    render() {
        return (
            <div>
                <Card title="饼图表之一">
                    <ReactEcharts style={{height:500}} option={this.getOptions()} theme="roadhog" />
                </Card>
                <Card title="饼图表之二">
                <ReactEcharts style={{height:500}} option={this.getOptions2()} theme="roadhog" />
                </Card>
                <Card title="饼图表之三">
                <ReactEcharts style={{height:500}} option={this.getOptions3()} theme="roadhog" />
                </Card>
            </div>
        )
    }
}