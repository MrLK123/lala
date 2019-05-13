import React from 'react';
import { Card,Table,Modal,Button,message} from 'antd';
import axios from './../../../axios/index.js';
import Utils from './../../../utils/utils';
export default class BasicTable extends React.Component{
    state={
        dataSource2:[],
        selectedRowKeys1:[],
        selectRows:[]
    }
    // params={
    //     page:1
    // }
    radioChange=(index,record)=>{
       
        let selectedRowKeys=[index[0]];
        Modal.info({
            title:"提示",
            content:`用户名：${record[0].username} 居住地：${record[0].address}`
        })
        this.setState({
            selectedRowKeys,
            selectItem:record[0]
        })
    }
    onRowClick=(record,index)=>{
        let selectedRowKeys=[index];
        Modal.info({
            title:"提示",
            content:`用户名：${record.username}  居住地：${record.address}`
        })
        this.setState({
            selectedRowKeys,
            selectItem:record
        })
    }
    componentDidMount(){
        this.request();
        const dataSource=[
            {   
                
                id:"0",
                username:"tom",
                sex:"1",
                state:"1",
                interest:"1",
                birthday:"2010-1-1",
                address:"美国巴黎铁塔的鸟窝",
                time:"10-12"
            },
            {
                id:"1",
                username:"jarry",
                sex:"1",
                state:"1",
                interest:"1",
                birthday:"2010-1-1",
                address:"美国巴黎铁塔的鸟窝",
                time:"10-12"
            },
            {
                id:"2",
                username:"susan",
                sex:"1",
                state:"1",
                interest:"1",
                birthday:"2010-1-1",
                address:"美国巴黎铁塔的鸟窝",
                time:"10-12"
            }
        ]
        dataSource.map((item,index)=>item.key=index)
        this.setState({
            dataSource
        })
       
    }
   
    //页面初始化
    request=()=>{
        let _this=this;
        axios.ajax({
            url:"/table/list",
            data:{
                params:{
                    page : this.params?this.params.page:1
                }
            }
        }).then(res=>{
            
            if(res.status=="10001"){
                res.result.list.map((item,index)=>item.key=index);
                this.setState({
                    dataSource2:res.result.list,
                    selectRows:[],
                    selectedRowKeys1:[],
                    pagination:Utils.pagination(res,(current)=>{
                        _this.params={page:current};
                        this.request();
                    })
                })
            }
        });
    }
    onSelectChange = (selectedRowKeys1,selectRows) => {  
       
        this.setState({ selectedRowKeys1,selectRows });
      }
    onCheckBoxClick=(record,index)=>{
        let {selectedRowKeys1,selectRows}=this.state;
        if(selectedRowKeys1.includes(index)){
            selectedRowKeys1=selectedRowKeys1.filter(item=>item!==index);
            selectRows=selectRows.filter(item=>item.id!==record.id);
           
        }else{
            selectedRowKeys1.push(index);
            selectRows.push(record);
        }
          this.setState({
            selectedRowKeys1,
            selectRows
        })
    }
    deleteItem=()=>{
        let item=this.state.selectRows;
        let ids=[];
        let username=[];
        item.map(value=>{
            ids.push(value.id);
            username.push(value.username)
        })
        Modal.confirm({
            title:"提示",
            content:`是否确定删除用户？${username.join(',')}`,
            onOk:()=>{
                message.success('删除成功！');
               this.componentDidMount()
            }
        })
    }
    render(){
        const columns=[
            {
                title:"id",
                dataIndex:'id'
            },
            {
                title:"用户名",
                dataIndex:"username"
            } ,
            {
                title:"性别",
                dataIndex:"sex",
                render(sex){
                    return sex==1?"男":"女";
                }
            },
            {
                title:"状态",
                dataIndex:"state",
                render(state){
                    const config={
                        "1":"王者",
                        "2":"钻石",
                        "3":"白金",
                        "4":"黄金",
                        "5":"青铜"
                    };
                    return config[state];
                }
            },
            {
                title:"常用的英雄",
                dataIndex:"interest",
                render(state){
                    const config={
                        "1":"李白",
                        "2":"杜甫",
                        "3":"张飞",
                        "4":"关羽",
                        "5":"孙悟空",
                        "6":"猪八戒",
                        "7":"唐僧",
                        "8":"杨过"
                    };
                    return config[state];
                }
            },
            {
                title:"生日",
                dataIndex:"birthday"
            },
            {
                title:"地址",
                dataIndex:"address"
            },
            {
                title:"早起时间",
                dataIndex:"time"
            }
    ]
    const {selectedRowKeys,selectedRowKeys1}=this.state;
    
    const rowSelection={
        type:"radio",
        selectedRowKeys,
        onChange:this.radioChange
    }
    const rowCheckSelection = {
        selectedRowKeys:selectedRowKeys1,
        type:"checkBox",
        onChange: this.onSelectChange
      };
        return (
            <div>
            <Card title="基础表格">
                <Table
                    bordered
                    columns={columns}
                    dataSource={this.state.dataSource}
                    pagination={false}
                />
            </Card>
            <Card title="动态表格--mock">
                <Table
                    bordered
                    columns={columns}
                    dataSource={this.state.dataSource2}
                    pagination={false}
                />
            </Card>
            <Card title="动态表格选中--mock">
                <Table
                    bordered
                    rowSelection={rowSelection}
                    onRow={(record,index) => {
                        return {
                          onClick: () =>this.onRowClick(record,index),   
                        };
                      }}
                    columns={columns}
                    dataSource={this.state.dataSource2}
                    pagination={false}
                />
            </Card>
            <Card title="动态表格多选选中--mock">
                <div>
                    <Button type="danger"style={{marginBottom:15}} onClick={()=>this.deleteItem()}>删除</Button>
                </div>
                <Table
                    bordered
                    rowSelection={rowCheckSelection}
                    columns={columns}
                    onRow={(record,index)=>{
                       return {
                           onClick:()=>this.onCheckBoxClick(record,index)
                       }
                    }}
                    dataSource={this.state.dataSource2}
                    pagination={false}
                />
            </Card>
            <Card title="动态表分页--mock">
               
                <Table
                    bordered
                    columns={columns}
                    dataSource={this.state.dataSource2}
                    pagination={this.state.pagination}
                />
            </Card>
            </div>
        )
    }
}