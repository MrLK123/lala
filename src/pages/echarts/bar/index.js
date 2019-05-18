import React from 'react';
import { Card } from 'antd';
import echartTheme from './../echartTheme';
// 按需加载
import echarts from 'echarts/lib/echarts' //核心组件
// 导入柱形图
import 'echarts/lib/chart/bar'
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
                text:'用户骑行订单'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                   
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '订单量',
                    type: 'bar',
                    barWidth: '60%',
                    data: [10, 52, 200, 334, 390, 330, 220]
                }
            ]
        };
        return option;
    }
    getOptions2() {
        let option = {
            title:{
                text:'用户骑行订单'
            },
            legend:{
                data:["李白","奥巴马","曹操"]
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                   
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '李白',
                    type: 'bar',
                   
                    data: [10, 52, 200, 334, 390, 330, 220]
                },
                {
                    name: '奥巴马',
                    type: 'bar',
                 
                    data: [15, 22, 190, 34, 490, 30, 20]
                },
                {
                    name: '曹操',
                    type: 'bar',
             
                    data: [70, 92, 220, 134, 190, 230, 520]
                }
            ]
        };
        return option;
    }
    render() {
        return (
            <div>
                <Card title="柱形图表之一">
                    <ReactEcharts style={{height:500}} option={this.getOptions()} theme="roadhog" />
                </Card>
                <Card title="柱形图表之二">
                <ReactEcharts style={{height:500}} option={this.getOptions2()} theme="roadhog" />
                </Card>
            </div>
        )
    }
}