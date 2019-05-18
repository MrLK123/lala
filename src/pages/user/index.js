import React from 'react';
import {Card,Button,Form,Input,Modal,Radio,DatePicker,Select,message} from 'antd';
import axios from './../../axios/';
import Utils from './../../utils/utils';
import BaseForm from './../../components/BaseForm';
import  ETable from './../../components/ETable';
import  moment from 'moment';
const FormItem=Form.Item;
const TextAre=Input.TextArea;
const RadioGroup=Radio.Group;
const Option=Select.Option;
export default class User extends React.Component{
    state={
        visible:false
    }
    params={
        page:1
    }
    formList=[
        {
            type:"INPUT",
            label:"用户名",
            placeholder:"请输入用户名",
            width:120,
            field:"username"
        },
        {
            type:"INPUT",
            label:"手机号",
            field:"user_mobile",
            placeholder:"请输入用户手机号",
            width:140,
        },
        {
            type:"DATE",
            label:"请输入职日期",
            field:"date",
        }
    ]
    // 删除员工
    handleDelete=(id)=>{
        axios.ajax({
            url:"/user/list",
            data:{
                params:{
                    id
                }
            }
        }).then(res=>{
            if(res.status=="10001"){
                this.request();
                message.success("删除成功！");
            }
        })
    }
    handleOperat=(type)=>{
       let data=this.state.selectedItem;
        switch(type){
            case "create":
               this.setState({
                title:"添加员工",
                visible:true,
                type,
                data:{}
               }) ;break;
            case "edit":data?
                this.setState({
                    title:"修改信息",
                    visible:true,
                    type,
                    data
                }):Modal.info({
                    title:"温馨提示",
                    content:"请选中一条信息进行编辑"
                }) ;break;
                case "detail":
                data?this.setState({
                 title:"员工详情",
                 visible:true,
                 type,
                 data
                }):Modal.info({
                    title:"温馨提示",
                    content:"请选中一条信息进行查看"
                }) ;break; 
                case "delete":data?
                Modal.confirm({
                    title:"删除员工",
                    content:"确定删除选中的员工?",
                    onOk:()=>this.handleDelete(data.id)
                }):Modal.info({
                    title:"温馨提示",
                    content:"请选中一条信息进行操作"
                }) ;break; 
        }
    }
    handleSubmit=(type)=>{
      
        const params= this.formData.props.form.getFieldsValue();
       
        this.setState({
            visible:false
        })
        axios.ajax({
            url:type=="create"?"/user/list":"/user/list",
            data:{
                params
            }
        }).then(res=>{
            if(res.status=="10001"){
                this.formData.props.form.resetFields();
                this.request();
                message.success(type=="create"?"添加成功":"修改成功");
                this.formData.props.form.resetFields();
            }
        })
    }
    componentDidMount(){
        this.request();
    }
    // 初始化
    request=()=>{
        axios.requesList(this,"/user/list",this.param);
    }
    handleFilter=(param)=>{
        this.param=param;
        this.request(param);
    }
    render(){
        const columns=[
            {title:"id",dataIndex:"id"},
            {title:"用户名",dataIndex:"username"},
            {title:"性别",dataIndex:"sex",render:(sex)=>{return sex==1?"男":"女"}},
            {title:"状态",dataIndex:"state",render:(state)=>{return {"1":"王者","2":"钻石","3":"白金","4":"青铜"}[state]}},
            {title:"爱好",dataIndex:"interest",render:(interest)=>{return {"1":"李白","2":"杜甫","3":"关羽","4":"张飞","5":"刘备","6":"赵云","7":"提莫","8":"奥巴马"}[interest]}},
            {title:"生日",dataIndex:"birthday"},
            {title:"联系地址",dataIndex:"address"},
            {title:"早起时间",dataIndex:"time"}
        ]
        const footer= this.state.type=="detail"?{footer:null}:{};
        return (
            <div>
                <Card>
                <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{marginTop:10}} className="operat-wrap">
                <Button icon="plus" type="primary" onClick={()=>this.handleOperat("create")}>添加员工</Button>
                <Button icon="edit" type="primary" onClick={()=>this.handleOperat("edit")}>修改员工</Button>
                <Button  type="primary" onClick={()=>this.handleOperat("detail")}>员工详情</Button>
                <Button icon="delete" type="danger" onClick={()=>this.handleOperat("delete")}>删除员工</Button>
                </Card>
                <Card>
                <ETable
                updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                columns={columns}
                dataSource={this.state.dataSource}
                selectedRowKeys={this.state.selectedRowKeys}
                selectedIds={this.state.selectedIds}
                selectedItem={this.state.selectedItem}
                pagination={this.state.pagination}
                
                />
                </Card>
                <Modal
                  title={this.state.title}
                  visible={this.state.visible}
                  onOk={()=>this.handleSubmit(this.state.type)}
                  onCancel={()=>{
                      this.formData.props.form.resetFields();
                      this.setState({
                        visible:false
                    })
                  }}
                  width={600}
                  {...footer}
                >
                <UserForm type={this.state.type} data={this.state.data} wrappedComponentRef={(init)=>this.formData=init}/>
                </Modal>
            </div>
        )
    }
}

class UserForm extends React.Component{
    getState=(index)=>{
        return  {"1":"王者","2":"钻石","3":"白金","4":"青铜"}[index];
    }
    render(){
        const {data}=this.props;
        const {getFieldDecorator} =this.props.form;
        const formListLayout={
            labelCol:{
                span:6
            },
            wrapperCol:{
                span:10
            }
        }
       const detail=this.props.type==="detail";
     
        return (
            <Form layout="horizontal">
                <FormItem style={{marginBottom:10}} label="用户名" {...formListLayout}>
                    {    detail?data.username:
                         getFieldDecorator("user_name",{
                            initialValue:data.username
                        })(
                            <Input type="text" placeholder="请输入员工姓名" />
                        )
                    }
                </FormItem>
                <FormItem style={{marginBottom:10}} label="性别" {...formListLayout}>
                    {
                       detail?data.sex==1?"男":"女":
                        getFieldDecorator("sex",{
                            initialValue:data.sex
                        })(
                           <RadioGroup>
                               <Radio value={1} >男</Radio>
                               <Radio value={2} >女</Radio>
                           </RadioGroup>
                        )
                    }
                </FormItem >
                <FormItem style={{marginBottom:10}} label="状态" {...formListLayout}>
                    {
                        detail?this.getState(data.state):
                        getFieldDecorator("state",{
                            initialValue:data.state
                        })(
                           <Select>
                               <Option value={1} >王者</Option>
                               <Option value={2} >钻石</Option>
                               <Option value={3} >白金</Option>
                               <Option value={4} >黄金</Option>
                               <Option value={5} >青铜</Option>
                           </Select>
                        )
                    }
                </FormItem>
                <FormItem style={{marginBottom:10}} label="生日" {...formListLayout}>
                    {  
                        detail?data.birthday:
                        getFieldDecorator("birthday",{
                            initialValue:data?moment(data.birthday):" "
                        })(
                           <DatePicker/>
                        )
                    }
                </FormItem>
                <FormItem  label="地址" {...formListLayout}>
                    {
                        detail?data.address:
                        getFieldDecorator("address",{
                            initialValue:data.address
                        })(
                           <TextAre placeholder="请输入家庭住址"/>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}
UserForm=Form.create({})(UserForm);