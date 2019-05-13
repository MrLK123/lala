import React from 'react';
import { Card } from 'antd';
import axios from './../../axios';
import './detail.less';
export default class OrderDetail extends React.Component {
  state={};
  componentDidMount(){
    this.request();
    
  }
  // 初始化
  request=()=>{
    axios.ajax({
      url:"/order/detail",
      data:{
        params:{
          page:1
        }
      }
    }).then(res=>{
      if(res.status=="10001"){
        this.setState({
          orderInfo:res.result.item_list[0]
        })
       
        this.renderMap(res.result);
      }
    })
  }
  // 创建地图
  renderMap=(result)=>{
    // 创建地图实例
    this.map = new window.BMap.Map("orderDetailMap");
    // 初始化地图，设置中心点坐标和地图级别 
   
    // 添加控件
    this.addMapControl();
    // 调用绘图法
    this.drowBikeRouter(result.position_list);
    // 调用服务区
    this.drowarea(result.area);
  console.log(result);
  }
  // 添加地图控件
  addMapControl=()=>{
    let {map}=this;
    map.addControl(new window.BMap.NavigationControl({anchor:window.BMAP_ANCHOR_TOP_LEFT}));
    map.addControl(new window.BMap.ScaleControl({anchor:window.BMAP_ANCHOR_TOP_RIGHT}));
  }
  // 绘制路线
  drowBikeRouter=(pointList)=>{
  
    let startPoint = '';
    let endPoint='';
   if(pointList.length){
    let first=pointList[0];
    let last=pointList[pointList.length-1];
    // 新建一个百度坐标
    startPoint=new window.BMap.Point(first.lon,first.lat);
    // 创建图标地图覆盖物概述
    let startIcon=new window.BMap.Icon('/assets/start_point.png',new window.BMap.Size(36,42),{
      imageSize:new window.BMap.Size(36,42),
      anchor:new window.BMap.Size(16,32)
    })
    //  marker坐标点展示
   let startMarker=new window.BMap.Marker(startPoint,{ icon:startIcon});
   this.map.addOverlay(startMarker);




    // 新建一个百度坐标
    endPoint=new window.BMap.Point(last.lon,last.lat);
    // 创建图标地图覆盖物概述
    let endIcon=new window.BMap.Icon('/assets/end_point.png',new window.BMap.Size(36,42),{
      imageSize:new window.BMap.Size(36,42),
      anchor:new window.BMap.Size(10,30)
    })
    //  marker坐标点展示
   let endMarker=new window.BMap.Marker(endPoint,{ icon:endIcon});
   this.map.addOverlay(endMarker);
   this.map.centerAndZoom(startPoint, 11);
   }
    
  //  绘制路线
   let trackPoint=pointList.map(point=>new window.BMap.Point(point.lon,point.lat));
   let polyline=new window.BMap.Polyline(trackPoint,{
       strokeColor:"#1869AD",
       strokeWeight:3,
       strokeOpacity:1
   })
   this.map.addOverlay(polyline);
    // driving.search(start, end);
  }
  // 绘制服务区
  drowarea=(arealist)=>{
      let trackarea=arealist.map(point=>new window.BMap.Point(point.lon,point.lat));
      let arealine=new window.BMap.Polygon(trackarea,{
        strokeColor:"#ff0000",
        strokeWeight:4,
        strokeOpacity:1,
        fillColor:"#ff8605",
        fillOpacity:0.3
      })
      this.map.addOverlay(arealine);
  }
  render() {
    const data=this.state.orderInfo || {};
  
    return (
      <div>
        <Card >
          <div id="orderDetailMap" className="order-map"></div>
          <div className="detail-item">
            <div className="item-title">基础信息</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">用车模式</div>
                <div className="detail-form-content">{data.mode==1?"服务区":"禁停区"}</div>
              </li>
              <li>
                <div className="detail-form-left">订单编号</div>
                <div className="detail-form-content">{data.order_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">车辆编号</div>
                <div className="detail-form-content">{data.bike_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">用户姓名</div>
                <div className="detail-form-content">{data.username}</div>
              </li>
              <li>
                <div className="detail-form-left">手机号码</div>
                <div className="detail-form-content">{data.mobile}</div>
              </li>
            </ul>
            </div>
            <div className="detail-item"> 
            <div className="item-title">行驶轨迹</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">行程起点</div>
                <div className="detail-form-content">{data.start_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行程终点</div>
                <div className="detail-form-content">{data.end_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行驶里程</div>
                <div className="detail-form-content">{data.distance/1000}公里</div>
              </li>

            </ul>
          </div>
          </Card>

      </div>
    )
  }
}