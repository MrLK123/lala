import React from 'react';
import { Card, Form } from 'antd';
import BaseForm from './../../components/BaseForm';
import axios from '../../axios';
import BMap from 'BMap';
export default class BikeMap extends React.Component {
    state = {}
    formList = [

        {
            type: "SELECT",
            label: "城市",
            placeholder: "全部",
            width: 90,
            field: "city",
            list: [{ id: "1", name: "北京" }, { id: "2", name: "天津" }]
        }, {
            type: "时间查询"
        }, {
            type: "SELECT",
            label: "订单状态",
            placeholder: "全部",
            width: 90,
            field: "status",
            list: [{ id: "1", name: "进行中" }, { id: "2", name: "结束" }]
        }

    ]
    request = () => {
        axios.ajax({
            url: "/map/bike_list",
            params: this.params
        }).then(res => {

            if (res.status == "10001") {
                this.setState({
                    total_count: res.result.total_count
                })
                this.renderMap(res);
            }
        })
    }
    renderMap = (res) => {
        let mapList = res.result.route_list;
        console.log(mapList);
        this.map = new BMap.Map("container");
        let gps1 = mapList[0].split(",");
        let startPoint = new BMap.Point(gps1[0], gps1[1])
        let gps2 = mapList[mapList.length - 1].split(",");
        let endPoint = new BMap.Point(gps2[0], gps2[1]);
        this.map.centerAndZoom(endPoint, 11);
        // 参数1为中心，参数2为缩放范围
        let startPointIcon = new BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
            imageSize: new BMap.Size(36, 42),
        })
        let bikeMarkerStart = new BMap.Marker(startPoint, { icon: startPointIcon })
        this.map.addOverlay(bikeMarkerStart);
        let endPointIcon = new BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
            imageSize: new BMap.Size(36, 42)
            // anchor:new window.BMap.Size()
        })
        let bikeMarkerEnd = new BMap.Marker(endPoint, { icon: endPointIcon });
        this.map.addOverlay(bikeMarkerEnd);
        // 路线
        let routeList = [];
        mapList.forEach(item => {
            let p = item.split(',');
            routeList.push(new BMap.Point(p[0], p[1]))
        })
        let polyLine = new BMap.Polyline(routeList, {
            strokeColor: "#009930",
            strokeWeight: 2,
            strokeOpacity: 1
        })
        this.map.addOverlay(polyLine);
        //    单车分布
        let bikeList = res.result.bike_list;
        let bikeIcom = new BMap.Icon("/assets/bike.jpg", new BMap.Size(36, 42), {
            imageSize: new BMap.Size(36, 42),
            anchor: new BMap.Size(36, 42)
        })
        bikeList.forEach(item => {
            let p = item.split(",");
            let point = new BMap.Point(p[0], p[1]);
            let bileMarker = new BMap.Marker(point, { icon: bikeIcom });
            this.map.addOverlay(bileMarker);
        })
        // 服务区
        let serviceList = res.result.service_list;
        let servicePointList = serviceList.map(item =>
            new BMap.Point(item.lon, item.lat));
        let polyServiceLine = new BMap.Polyline(servicePointList, {
            strokeColor: "#ef4136",
            strokeWeight: 3,
            strokeOpacity: 1
        })
        this.map.addOverlay(polyServiceLine);
    }

    componentWillMount() {
        this.request();
    }
    handleFiter = (params) => {
        this.params = params;
        this.request()
    }
    render() {
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFiter} />
                </Card>
                <Card>
                    <div>当前共{this.state.total_count}辆车</div>
                    <div id="container" style={{ height: 500 }}></div>
                </Card>
            </div>
        )
    }
}