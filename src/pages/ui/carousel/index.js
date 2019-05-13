import React from 'react';

import {Card,Carousel} from 'antd';
import './../ui.less'
export default class Carousels extends React.Component{
    render(){
        return (
            <div>
                <Card title="文字背景轮播">
                    <Carousel autoplay effect="fade"> 
                        <div><h3>Ant Motion Banner - Dva</h3></div>
                        <div><h3>Ant Motion Banner - React</h3></div>
                        <div><h3>Ant Motion Banner - Vue</h3></div>
                        <div><h3>Ant Motion Banner - Angular</h3></div>
                    </Carousel>
                </Card>
                <Card title="图片轮播" className="button-wrap">
                    <Carousel autoplay > 
                        <div><img src="/carousel-img/carousel-1.jpg"  /></div>
                        <div><img src="/carousel-img/carousel-2.jpg"  /></div>
                        <div><img src="/carousel-img/carousel-3.jpg"  /></div>
                        <div><img src="/carousel-img/carousel-2.jpg"  /></div>
                    </Carousel>
                </Card>
            </div>
        )
    }
}