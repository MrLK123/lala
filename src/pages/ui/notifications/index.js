import React  from 'react';
import {Button,Card,notification }  from 'antd';
import './../ui.less';
export default class Notifications extends React.Component{
    openNotification=(type,direction)=>{
        if(direction){
            notification.config({
                placement:direction
            })
        }else{
            notification.config({
                placement:"topRight"
            })
        }
        notification[type]({
            message:"发工资了",
            description:"上个月考勤100天，迟到1天，罚款10000"
        })
    }
    render(){

        return (

            <div>

                <Card title="通知提醒框" className="button-wrap">
                    <Button type="primary" onClick={()=>this.openNotification("success")}>Success</Button>
                    <Button type="primary" onClick={()=>this.openNotification("info")}>Info</Button>
                    <Button type="primary" onClick={()=>this.openNotification("warning")}>Warning</Button>
                    <Button type="primary" onClick={()=>this.openNotification("error")}>Error</Button>
                </Card>
                <Card title="不同位置通知提醒框" className="button-wrap">
                    <Button type="primary" onClick={()=>this.openNotification("success","topLeft")}>Success</Button>
                    <Button type="primary" onClick={()=>this.openNotification("info","topRight")}>Info</Button>
                    <Button type="primary" onClick={()=>this.openNotification("warning","bottomLeft")}>Warning</Button>
                    <Button type="primary" onClick={()=>this.openNotification("error","bottomRight")}>Error</Button>
                </Card>
            </div>
        )
    }
}