import React from 'react';
import { Card,Button,Modal} from 'antd';
import './../ui.less'
export default class Modals extends React.Component{
    state={
        ShowModal1:false,
        ShowModal2:false,
        ShowModal3:false,
        ShowModal4:false,
    }
    handleClick=(type)=>{
        this.setState({
            [type]:true
        })
    }
    handleConfirm=(type)=>{
        Modal[type]({
            title:"antd",
            content:"干什么来的？",
            onOk(){
                    console.log("ok")
            },
            onCancel(){
                    console.log("Cancel")
                }
        })
    }
    render(){
        return (
            <div>
                <Card title="基础弹框" className="button-wrap">
                    <Button type="primary" onClick={()=>this.handleClick("ShowModal1")}>Open</Button>
                    <Button type="primary" onClick={()=>this.handleClick("ShowModal2")}>自定义页脚</Button>
                    <Button type="primary" onClick={()=>this.handleClick("ShowModal3")}>顶部20px弹框</Button>
                    <Button type="primary" onClick={()=>this.handleClick("ShowModal4")}>水平垂直居中</Button>
                    </Card>
                <Card title="信息确认框" className="button-wrap">
                    <Button type="primary" onClick={()=>this.handleConfirm("confirm")}>Comfirm</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm("success")}>Success</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm("info")}>Info</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm("warning")}>Wraning</Button>
                </Card>
                <Modal title="dva" visible={this.state.ShowModal1} onCancel={()=>this.setState({
                    ShowModal1:false
                })}>
                    <p>欢迎到此一游！！！</p>
                </Modal>
                <Modal title="dva" 
                     okText="好的"
                     cancelText="算了"
                     visible={this.state.ShowModal2}
                      onCancel={()=>this.setState({
                        ShowModal2:false
                    })}>
                    <p>欢迎到此一游！！！</p>
                </Modal>
                <Modal title="dva" style={{top:20}}
                     visible={this.state.ShowModal3}
                      onCancel={()=>this.setState({
                        ShowModal3:false
                    })}>
                    <p>欢迎top20px到此一游！！！</p>
                </Modal>
                <Modal title="dva" 
                   wrapClassName="vertical-center-modal"
                     visible={this.state.ShowModal4}
                      onCancel={()=>this.setState({
                        ShowModal4:false
                    })}>
                    <p>欢迎top20px到此一游！！！</p>
                </Modal>
                
            </div>
        )
    }
}