import React from 'react';
import {Row,Col} from 'antd';
import './index.less';
import Utils from './../../utils/utils.js';
import axios from './../../axios';
import { connect } from 'react-redux'
class Header extends React.Component{
    
    componentWillMount(){
         this.setState({
        time:Utils.formateDate(new Date().getTime())
            })
        setInterval(()=>{
            this.setState({
              time:Utils.formateDate(new Date().getTime())
            })     
        },1000);
        this.setState({
            userName:"roadhog"
        })
       this.getWeatherAPIData();
    }
    getWeatherAPIData(){
        let city="北京";
        axios.jsonp({
            url:"http://api.map.baidu.com/telematics/v3/weather?location="+encodeURIComponent(city)+"&output=json&ak=3p49MVra6urFRGOT9s8UBWr2"
        }).then(res=>{
            let data=res.results[0].weather_data[0];
            this.setState({
                dayPictureUrl:data.dayPictureUrl,
                weather:data.weather
            })
           
        })
    }
    render(){
        let {menuType}=this.props;
        return (
            <div className="header">
                <Row className="header-top">
                    {
                        menuType?(
                            <Col span={6} className="logo">
                            <img src="/assets/logo-ant.svg" alt="" />
                            <span>WZrooc 英雄联盟</span>
                           </Col>
                        ):""
                    }
                    <Col span={menuType?18:24}>
                         <span>欢迎， {this.state.userName}</span>
                         <a href="#">退出</a>
                    </Col>
                </Row>
                {
                    menuType?"":(
                        <Row className="breadcrumb">
                    <Col span={4} className="breadcrumb-title">{this.props.menuName}</Col>
                    <Col span={20} className="weather">
                        <span className="data">{this.state.time}</span>
                        <span className="weather-img"><img src={this.state.dayPictureUrl} /></span>
                        <span className="weather-detail">{this.state.weather}</span>
                    </Col>
                </Row>
                )
                }
                
            </div>
        )
    }
}
const mapStateToProps=state=>({
    menuName:state.menuName
})
export default connect(mapStateToProps)(Header);