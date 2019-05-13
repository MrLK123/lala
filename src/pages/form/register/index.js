import React from 'react';
import moment from 'moment';
import {Button,message, Card, Upload, DatePicker, Input, TimePicker, Form, Select, Radio, InputNumber, Switch, Icon,Checkbox } from 'antd';
import './../form.less'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;

class Register extends React.Component {
    state = {}
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    }
    handleSubmit=()=>{
        const formData=this.props.form.getFieldsValue();
        console.log(JSON.stringify(formData));   
        message.success(`欢迎 ${formData.username} 来到王者荣耀，当前密码为${formData.password}`)
    }
    handleReset=()=>{
        this.props.form.resetFields()
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const autosize = { minRows: 2, maxRows: 6 };
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 }
            }
        }
        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: {
                    span: 12,
                    offset: 4
                }
            }
        }
        return (
            <div>
                <Card title="注册页面">
                    <Form>
                        <FormItem label="用户名" {...formItemLayout}>
                            {
                                getFieldDecorator("username", {
                                    initialValue: "侯付希",
                                    rules: [
                                        {
                                            required: true,
                                            message: "用户名不能为空"
                                        },
                                        {
                                            max: 10,
                                            message: "用户名最多10个字夫"
                                        }
                                    ]
                                })(<Input />)
                            }
                        </FormItem>

                        <FormItem label="密码" {...formItemLayout}>
                            {
                                getFieldDecorator("password", {
                                    initialValue: "123456",
                                    rules: [
                                        {
                                            required: true,
                                            message: "密码不能为空"
                                        },
                                        {
                                            min: 6,
                                            message: "密码长度不能小于6位"
                                        }
                                    ]
                                })(<Input.Password />)
                            }
                        </FormItem>

                        <FormItem label="性别" {...formItemLayout}>
                            {
                                getFieldDecorator("sex", {
                                    initialValue: "1",
                                    rules: [
                                        {
                                            required: true,
                                            Message: "必选"
                                        }
                                    ]
                                })(<RadioGroup>
                                    <Radio value="1">男</Radio>
                                    <Radio value="2">女</Radio>
                                </RadioGroup>)
                            }
                        </FormItem>

                        <FormItem label="年龄" {...formItemLayout}>
                            {
                                getFieldDecorator("age", {
                                    initialValue: 18
                                })(<InputNumber />)
                            }

                        </FormItem>


                        <FormItem label="喜欢的英雄" {...formItemLayout}>
                            {
                                getFieldDecorator("state", {
                                    initialValue: "1"
                                })(<Select >
                                    <Option value="1">灭霸</Option>
                                    <Option value="2">圣姑</Option>
                                    <Option value="3">悟空</Option>
                                    <Option value="4">八戒</Option>
                                    <Option value="5">白娘子</Option>
                                </Select>)
                            }
                        </FormItem>

                        <FormItem label="禁用英雄" {...formItemLayout}>
                            {
                                getFieldDecorator("interest", {
                                    initialValue: ["1"]
                                })(
                                    <Select mode="multiple">
                                        <Option value="1">亚瑟</Option>
                                        <Option value="2">兰陵王</Option>
                                        <Option value="3">悟空</Option>
                                        <Option value="4">八戒</Option>
                                        <Option value="5">李白</Option>
                                        <Option value="7">程咬金</Option>
                                        <Option value="8">关羽</Option>
                                        <Option value="9">刘备</Option>
                                        <Option value="10">刘能</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="婚否" {...formItemLayout}>
                            {
                                getFieldDecorator('married', {
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(<Switch />)
                            }
                        </FormItem>
                        <FormItem label="生日" {...formItemLayout}>
                            {
                                getFieldDecorator('birthday', {
                                    initialValue: moment("2019-02-02 10:03:33")
                                })(<DatePicker
                                    showTime
                                    format="YYYY-MM-DD HH:mm:ss"
                                />)
                            }
                        </FormItem>
                        <FormItem label="联系地址" {...formItemLayout}>
                            {
                                getFieldDecorator("address", {
                                    initialValue: '美国纽约奥巴马家里'
                                })(<TextArea
                                    autosize={autosize}
                                />)
                            }
                        </FormItem>
                        <FormItem label="早起时间" {...formItemLayout}>
                            {
                                getFieldDecorator("time", {
                                    initialValue: moment("2019-03-15 8:10:12"),

                                })(<TimePicker

                                />)
                            }
                        </FormItem>
                        <FormItem label="头型" {...formItemLayout}>
                            {
                                getFieldDecorator("userImg")(<Upload
                                    listType="picture-card"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    onChange={this.handleChange}
                                >
                                    {this.state.imageUrl ? <img src={this.state.imageUrl} style={{ width: 100, height: 100 }} /> : <Icon type="plus" />}</Upload>)
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator("http",{
                                    valuePropName:"checked",
                                    initialValue:false
                                })(
                                    <Checkbox> 我已经阅读过<a href="#">王者荣耀</a>协议 </Checkbox>
                                )
                            }
                    </FormItem>
                    <FormItem {...offsetLayout} className="submit-wrap  ">
                         <Button type="primary" onClick={()=>this.handleSubmit()}>注册</Button><Button type="dashed" onClick={()=>this.handleReset()}>重置</Button>
                    </FormItem>                 
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create()(Register);