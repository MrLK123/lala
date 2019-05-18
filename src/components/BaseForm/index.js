import React,{Fragment} from 'react';
import {Form,Select,Input,Button,Radio,Checkbox,DatePicker} from 'antd';
import Utils from './../../utils/utils';
const FormItem=Form.Item;
const Option=Select.Option;

class FilterForm extends React.Component{
    handleFiterSubmit=()=>{
       let fieldsValue= this.props.form.getFieldsValue();
       this.props.filterSubmit(fieldsValue);
    }
    // 重置选项
    reset=()=>{
        this.props.form.resetFields();
        this.setState({
            selecteItem:null,
            selectedRowKeys:[]
        })
    }
    initFormList=()=>{
        const {getFieldDecorator}=this.props.form;
        const {formList}=this.props;
        let list;
        if(formList && formList.length > 0){
            list=formList.map((item,index)=>{
                let {type,label,field,placeholder,width,list,initialValue}=item;
                
                switch(type){
                    case "INPUT":
                 
                    return <FormItem label={label} key={field}>
                       {
                           getFieldDecorator(field,{
                               initialValue
                           })(
                               <Input type="text"  style={{width}} placeholder={placeholder} />
                           )
                       }
                       </FormItem>
                    case "SELECT":
                      return <FormItem label={label} key={field}>
                       {
                           getFieldDecorator(field,{
                            initialValue
                           })(
                               <Select placeholder={placeholder} style={{width}} >
                               {Utils.getOptionList(list)}
                           </Select>
                           )
                       }
                       </FormItem>
                     case "CHECKBOX":
                     return (<FormItem label={lable} key={field}>
                      {
                          getFieldDecorator(field,{
                              valuePorpsName:"checkbed",
                              initialValue//true 或者false
                          })(
                              <CheckBox>{label}</CheckBox>
                          )
                      }
                      </FormItem>)
                      case "时间查询":
                      return (<Fragment key="1"> <FormItem label="时间" >
                            {
                                getFieldDecorator("begin_tiem")(
                                    <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                                )
                            }
                      </FormItem><FormItem label="~" colon={false} >
                      {
                          getFieldDecorator("end_tiem")(
                              <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                          )
                      }
                        </FormItem>
                    </Fragment>);
                    case "DATE":
                    return (
                        <FormItem key={field} label={label} >
                            {
                                getFieldDecorator(field)(
                                    <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                                )
                            }
                      </FormItem>
                    )
                }
            })
        }
        return list;
    }
   render(){
       return (
           <Form layout="inline">
              {this.initFormList()}
              <FormItem >
                    <Button type="primary" onClick={this.handleFiterSubmit} style={{marginRight:10}}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
           </Form>
       )
   }
}

export default Form.create({})(FilterForm)