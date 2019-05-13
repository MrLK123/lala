import React from 'react';
import {Button,Card,Icon,Radio} from 'antd';
import './../ui.less'
export default class Buttons extends React.Component{
    state=({
        loading:true,
        size:"default"
    })
    handleCloseLoading=()=>{
        this.setState({
            loading:!this.state.loading
        })
    }
    handleChangeSize=(e)=>{

        this.setState({
            size:e.target.value
        })
    }
    render(){
        return (
            <div>
                <Card title="基础按钮" className="button-wrap">
                    <Button type="primary" >hooks</Button>
                    <Button type="primary" >hooks</Button>
                    <Button type="dashed">hooks</Button>
                    <Button type="danger">hooks</Button>
                    <Button disabled>hooks</Button>
                </Card>
                <Card title="图形按钮" className="button-wrap">
                    <Button icon="plus" >创建</Button>
                    <Button icon="edit">编辑</Button>
                    <Button icon="delete">删除</Button>
                    <Button icon="search" shape="circle"></Button>
                    <Button type="primary" icon="search">hooks</Button>
                    <Button type="primary" icon="download">hooks</Button>
                </Card>
                <Card title="图形按钮" className="button-wrap">
                    <Button type="primary" loading={this.state.loading} >确定</Button>
                    <Button type="primary" shape="circle" loading={this.state.loading}></Button>
                    <Button loading={this.state.loading}>点击加载</Button>
                    <Button  shape="circle" loading={this.state.loading}></Button>
                    <Button type="primary"  onClick={()=>this.handleCloseLoading()}>关闭</Button>
                </Card>
                <Card title="按钮组">
                    <Button.Group>
                    <Button type="primary"><Icon type="left"/>返回</Button>
                    <Button type="primary">前进<Icon type="right"/></Button>
                    </Button.Group>
                </Card>
                <Card title="按钮尺寸" className="button-wrap">
                     <Radio.Group value={this.state.size} onChange={this.handleChangeSize}>
                        <Radio value="small" />
                        <Radio value="default" />
                        <Radio value="large" />
                     </Radio.Group>
                    <Button type="primary" size={this.state.size}>hooks</Button>
                    <Button size={this.state.size}>hooks</Button>
                    <Button type="dashed" size={this.state.size}>hooks</Button>
                    <Button type="danger" size={this.state.size}>hooks</Button>
                </Card>
            </div>
        )
    }
}