import { Select } from 'antd';
import React from 'react';
const Option= Select.Option;
export default {
    formateDate(time){
        if(!time)return "";
    time=new Date(time);
   return `${time.getFullYear()}-${(time.getMonth()+1)<10?"0"+(time.getMonth()+1):(time.getMonth()+1)}-${time.getDate()<10?"0"+time.getDate():time.getDate()} ${time.getHours()<10?"0"+time.getHours():time.getHours()}:${time.getMinutes()<10?"0"+time.getMinutes():time.getMinutes()}:${time.getSeconds()<10?"0"+time.getSeconds():time.getSeconds()}`;
    },
    pagination(data,callback){
       
        return {
            onChange:(current)=>{
                callback(current)
            },
            current:data.result.page,
            pageSize:data.result.page_size,
            total:data.result.total,
            showTotal:()=>{
                return `共${data.result.total}条`;
            },
            showQuickJumper:true
        }
    },
    getOptionList(data){
        if(!data){
            return [];
        }
        let options=[<Option value="0" key="all_key">全部</Option>];
        data.map(item=>options.push(<Option value={item.id} key={item.id}>{item.name}</Option>))
        return options;
    }
}