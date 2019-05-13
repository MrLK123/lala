import React from 'react';
// import './../ui.less';
import { Card,Button,Form,Input,message,Icon,Checkbox} from 'antd';
const FormItem=Form.Item;
 class FormLogin extends React.Component{
    handleSubmit=()=>{
        let userInfo =this.props.form.getFieldsValue();
        this.props.form.validateFields((err,values)=>{
            if(!err){
                message.success(`${userInfo.userName} 恭喜你,胜利`);
            }
        })
    }
    render(){
        const {getFieldDecorator}=this.props.form;
       
        return (
            <div>
                <Card title="登陆行内表单" className="button-wrap">
                    <Form layout='inline'>
                        <FormItem>
                            <Input prefix={<Icon type="user"/>} placeholder="请输入密码"/>
                        </FormItem>
                        <FormItem>
                            <Input.Password prefix={<Icon type="lock"/>} placeholder="请输入用户名"/>
                        </FormItem>
                        <FormItem>
                            <Button  type="primary">登陆</Button>
                        </FormItem>
                        
                    </Form>
                </Card> 
                <Card title="登陆水平表单" className="button-wrap">
                    <Form style={{width:300}}>
                        <FormItem>
                            {
                                getFieldDecorator('userName',{
                                initalValue:"jack",
                                rules:[
                                    {
                                        required:true,
                                        message:"用户名不能为空",
                                    },{
                                        max:10,
                                        message:"用户名长度不能超过10个字符"
                                    },
                                    {
                                        pattern:/^\w+$/g,
                                        message:"用户名是字母和数字"
                                    }
                                ]
                            })(<Input prefix={<Icon type="user"/>} placeholder="请输入用户名"/>)
                            }
                            
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator("passwrod",{
                                    initalValue:"12323",
                                    rules:[
                                        {
                                            required:true,
                                            message:"密码不能为空"
                                        }
                                
                                    ]
                                })(
                            <Input.Password prefix={<Icon type="lock"/>}  placeholder="请输入密码"/>

                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator("remember",{
                                   
                                    valuePropName:"checked", initialValue:true
                                })(<Checkbox>记住密码</Checkbox>)
                            }
                            <a href="#" style={{float:'right'}}>忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button onClick={this.handleSubmit} type="primary" style={{width:"100%",marginLeft:0}}>登陆</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create()(FormLogin);