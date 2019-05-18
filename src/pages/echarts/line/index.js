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
            title: {
                text: '用户骑行订单'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: "订单量",
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }]
        };
        return option;
    }
    getOptions2() {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            legend:{
                data:["辅助","adc"]
            },
            tooltip: {
                trigger: 'axis'
            },
            
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: "adc",
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            },
            {
                name: "辅助",
                data: [830, 100, 200, 800, 1090, 1130, 1220],
                type: 'line'
            }
        ]
        };
        return option;

    }
    getOptions3() {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                 type: 'category',
        boundaryGap: false,
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: "订单量",
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                areaStyle: {}
            }]
        };
        return option;
    }
    render() {
        return (
            <div>
                <Card title="折线图表之一">
                    <ReactEcharts style={{ height: 500 }} option={this.getOptions()} theme="roadhog" />
                </Card>
                <Card title="折线图表之二">
                    <ReactEcharts style={{ height: 500 }} option={this.getOptions2()} theme="roadhog" />
                </Card>
                <Card title="折线图表之三">
                    <ReactEcharts style={{ height: 500 }} option={this.getOptions3()} theme="roadhog" />
                </Card>
            </div>
        )
    }
}