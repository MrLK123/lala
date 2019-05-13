import React from 'react';
import axios from './../../axios';

import BaseForm from  './../../components/BaseForm';
import {Card,Button,Form,Modal,message,Select,DatePicker,Table,Input} from 'antd';

const FormItem=Form.Item;
const Option=Select.Option;
export default class Order extends React.Component{
    state={};
    param={
        page:1
    }
    formList=[
        {
            type:"SELECT",
            label:"城市",
            field:"city",
            placeholder:"全部",
            initialValue:"全部",
            width:80,
            list:[{id:1,name:"北京"},{id:2,name:"天津"},{id:3,name:"深圳"}]
        },
        {
            type:"时间查询"
        },
        {
            type:"SELECT",
            label:"订单状态",
            field:"order_status",
            placeholder:"全部",
            initialValue:"全部",
            width:80,
            list:[{id:"1",name:"进行中"},{id:"2",name:"结束行程"}]
        }
    ]
    // 订单详细
    openOrderDetail=()=>{
        let {selecteItem}=this.state;
        if(!selecteItem){
            Modal.info({
                title:"温馨提示",
                content:"请选择一条订单"
            })
            return ;
        }
        window.open(`/#/common/order/detail/${selecteItem.id}`,"_blank");
    }
    // rowclick事件
    onRowClick=(record,index)=>{
        console.log(record,index)
        this.setState({
            selectedRowKeys:[index],
            selecteItem:record
        })
    }
    // 确认结束
    handleSubmit=()=>{
        let {selecteItem}=this.state;
        
        this.setState({
            isShowData:false
        })
        this.request();
        message.success(`订单 ${selecteItem.id}结算成功！`);
    }
    // 结束订单
    handleEnd=()=>{
        let {selecteItem}=this.state;
        if(!selecteItem){
            Modal.info({
                title:"温馨提示",
                content:"请选择一条订单"
            })
            return ;
        }
        axios.ajax({
            url:"/order/end",
            data:{
                params:{
                    page:1
                }
            }
        }).then(res=>{
            this.setState({
                isShowData:true,
                data:res.result.item_list
            })
        })
    }
    
    // 处理submit 
    handleFilter=(params)=>{
        this.params=params;
        this.request();
    }
    componentDidMount(){
        this.request();
    }
    // 初始化
    request=()=>{
        axios.requesList(this,"/order/list",this.params,true);
    
}
    render(){
        const columns=[
            {
                title:"订单编号",
                dataIndex:"order_sn"
            },
            {
                title:"车辆编号",
                dataIndex:"bike_sn"
            },
            {
                title:"用户名",
                dataIndex:"username"
            },
            {
                title:"手机号码",
                dataIndex:"mobile"
            },
            {
                title:"里程",
                dataIndex:"distance"
            },
            {
                title:"行程时长",
                dataIndex:"total_time"
            },
            {
                title:"状态",
                dataIndex:"status"
            },
            {
                title:"开始时间",
                dataIndex:"start_time"
            },
            {
                title:"结束时间",
                dataIndex:"end_time"
            },
            {
                title:"订单金额",
                dataIndex:"total_fee"
            },
            {
                title:"实付金额",
                dataIndex:"user_pay"
            }
        ]
        const {selectedRowKeys}=this.state;
        const rowSelection={
            type:'radio',
            selectedRowKeys,
            onChange:(record,index)=>this.onRowClick(index[0],record[0])
        }
        return (
            <div>
               <Card >
                   <BaseForm filterSubmit={this.handleFilter} formList={this.formList} />
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.openOrderDetail} style={{marginLeft:10}}>订单详情</Button>
                    <Button type="primary" onClick={this.handleEnd} style={{marginLeft:10}}>订单结束</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                    rowSelection={rowSelection}
                    onRow={(record,index)=>({
                        onClick: () =>this.onRowClick(record,index)
                    })}
                    bordered
                     columns={columns}
                     dataSource={this.state.dataSource}
                     pagination={this.state.pagination}
                    />
                </div>
                <Modal
                 title="结束订单"
                 visible={this.state.isShowData}
                 onCancel={()=>this.setState({
                     isShowData:false
                 })}
                 onOk={this.handleSubmit}
                >
                <Formend data={this.state.data}/>

                
                 
                </Modal>
            </div>
        )
    }
}



class Formend extends React.Component{
    render(){
        const {getFieldDecorator} =this.props.form;
        let {data}=this.props;
        const formItemLayout={
            labelCol:{
                span:8
            },
            wrapperCol:{
                span:16
            }
        }
        return (
            <Form >
                <FormItem label="车辆编号" {...formItemLayout}>
                {
                    getFieldDecorator("city",{
                        initialValue:data[0].id
                    })(
                        <Input style={{border:'none'}}/>
                    )
                }
                </FormItem>
                <FormItem label="剩余电量" {...formItemLayout}>
                {
                    getFieldDecorator("city",{
                        initialValue:data[0].quantity
                    })(
                        <Input style={{border:'none'}}/>
                    )
                }
                </FormItem>
                <FormItem label="行程开始时间" {...formItemLayout}>
                {
                    getFieldDecorator("city",{
                        initialValue:data[0].start_time
                    })(
                        <Input style={{border:'none'}}/>
                    )
                }
                </FormItem>
                <FormItem label="当前位置" {...formItemLayout}>
                {
                    getFieldDecorator("city",{
                        initialValue:data[0].location
                    })(
                        <Input style={{border:'none'}}/>
                    )
                }
                </FormItem>
            </Form>
        )
    }
}
Formend=Form.create({})(Formend);