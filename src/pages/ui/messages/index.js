import React from 'react';

import {Card,Button,message} from 'antd';
import './../ui.less';
export default class Messages extends React.Component{
        showMesage=(type)=>{
            message[type]("恭喜您！挂科成功！");
        }
   render(){
       return (
           <div>
               <Card title="message提示" className="button-wrap">
                   <Button type="primary" onClick={()=>this.showMesage("success")}>Success</Button>
                   <Button type="primary" onClick={()=>this.showMesage("info")}>Info</Button>
                   <Button type="primary" onClick={()=>this.showMesage("warning")}>Warning</Button>
                   <Button type="primary" onClick={()=>this.showMesage("error")}>Error</Button>
                   <Button type="primary" onClick={()=>this.showMesage("loading")}>Loading</Button>
               </Card>
           </div>
       )
   }
}