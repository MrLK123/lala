import React from 'react';
import { Card, Button, Select, Form ,Table,Modal,message} from 'antd';
import axios from './../../axios';
import Utils from './../../utils/utils';
import './../../style/common.less';
const Option = Select.Option;
const FormItem = Form.Item;

export default class City extends React.Component {
    state={
        isShowOpenCity:false
    };
    params={
        page:1
    }
    // 初始化
    componentDidMount(){
       this.request();
    }
    // 异步请求
    request=()=>{
        const _this=this;
        axios.ajax({
            url:"/opin/city",
            data:{
                params:{
                    page:this.params.page
                }
            }
        }).then(res=>{
            this.setState({
                dataSource:res.result.item_list.map((item,index)=>{
                    item.key=index;
                    return item;
                }),
                pagination:Utils.pagination(res,(current)=>{
                    _this.params.page=current;
                })
            })
        })
    }
    // 开通城市
    handleOpenCity=()=>{
       this.setState({
        isShowOpenCity:true
       })
    }
    // 城市开通提交
    handleSubmit=()=>{
        
           let cityInfo= this.cityForm.props.form.getFieldsValue();
           axios.ajax({
               url:"/city/open",
               data:{
                   params:{
                       cityInfo
                   }
               }
           }).then(res=>{
               if(res.status=="10001"){
                   message.success(res.result);
                   this.setState({
                       isShowOpenCity:false
                   })
                   this.request();
               }
           })
        
    }
    render() {
        const columns=[
            {
                title:"城市Id",
                dataIndex:"id"
            },
            {
                title:"城市名称",
                dataIndex:"name"
            },
            {
                title:"用车模式",
                dataIndex:"mode",
                render(mode){
                   return  mode==1?"停车点":"禁停区";
                }
            },
            {
                title:"营运模式",
                dataIndex:"op_mode",
                render(op_mode){
                    return op_mode==1?"自营":"加盟";
                }
            },
            {
                title:"授权加盟商",
                dataIndex:"franchisee_name"
            },
            {
                title:"城市管理员",
                dataIndex:"city_admins",
                render(arr){
                    return arr.map(item=>item.user_name).join(',');
                }
            },
            {
                title:"城市开通时间",
                dataIndex:"open_time"
            },
            {
                title:"操作时间",
                dataIndex:"update_time",
                render(update_time){
                    return Utils.formateDate(update_time);
                }
            },{
                title:"操作人",
                dataIndex:"sys_user_name"
            }
        ]
        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
                </Card>
                <div className="content-wrap">
                <Table
                     bordered
                     columns={columns}
                     dataSource={this.state.dataSource}
                     pagination={this.state.pagination}
                    />
                </div>
                <Modal 
                  title="开通城市"
                  visible={this.state.isShowOpenCity}
                  onCancel={()=>{
                          this.setState({
                              isShowOpenCity:false
                          })
                      }}
                  onOk={this.handleSubmit}
                >
                <OpenCityForm
                wrappedComponentRef={(inst)=>{this.cityForm=inst;}}
                />
                </Modal>
            </div>
        )
    }

}
class FilterForm extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="城市">
                    {
                        getFieldDecorator("city_id")(
                            <Select placeholder="全部" style={{ width: 90 }}>
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                                <Option value="3">深圳市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="用车模式">
                    {
                        getFieldDecorator("mode")(
                            <Select placeholder="全部" style={{ width: 130 }}>
                                <Option value="">全部</Option>
                                <Option value="1">指定停车点模式</Option>
                                <Option value="2">禁停区模式</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="营运模式">
                    {
                        getFieldDecorator("op_mode")(
                            <Select placeholder="全部" style={{width:80}}>
                                <Option value="">全部</Option>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="加盟商授权状态">
                    {
                        getFieldDecorator("auth_status")(
                            <Select placeholder="全部" style={{width:90}}>
                                <Option value="">全部</Option>
                                <Option value="1">已授权</Option>
                                <Option value="2">未授权</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{margin:"0 15px"}}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
FilterForm = Form.create({})(FilterForm);
class OpenCityForm extends React.Component{
    
    render(){
        const {getFieldDecorator}=this.props.form;
        const formItemLayout={
            labelCol:{
                span:5
            },
            wrapperCol:{
                span:8
            }
        }
        return (
            <Form layout="horizontal">
                <FormItem label="选择城市" {...formItemLayout}>
                   {
                       getFieldDecorator("city")(  
                       <Select placeholder="请选择">
                       <Option value="">全部</Option>
                       <Option value="1">北京市</Option>
                       <Option value="2">天津市</Option>
                   </Select>)
                   }
                </FormItem>
                <FormItem label="营运模式" {...formItemLayout}>
                     {
                         getFieldDecorator("op_mode")(
                            <Select placeholder="请选择">
                            <Option value="1">自营</Option>
                            <Option value="2">加盟</Option>
                        </Select>
                         )
                     }
                </FormItem>
                <FormItem label="用车模式" {...formItemLayout}>
                   {
                       getFieldDecorator("mode")(
                        <Select placeholder="请选择">
                        <Option value="1">指定停车点</Option>
                        <Option value="2">禁停区</Option>
                    </Select>
                       )
                   }
                </FormItem>
            </Form>
        )
    }
}
OpenCityForm=Form.create({})(OpenCityForm);