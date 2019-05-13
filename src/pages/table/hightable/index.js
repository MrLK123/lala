import React from 'react';
import {Card,Table,Badge,Modal,message,Button} from 'antd';
import axios from './../../../axios';

export default class HighTable extends React.Component{
    state={
        dataSource:[]
    }
    handleChange = (pagination, filters, sorter) => {
        console.log(sorter);
        this.setState({
            sorterOrder:sorter.order
        })
    }
    删除操作
    handleDelete=(item)=>{
        console.log(item);
        Modal.confirm({
            title:"提示",
            content:"您确定要删除此用户？",
            onOk:()=>{
                message.success("删除成功！");
                this.request();
            }
        })
    }
    componentDidMount(){
        this.request();
    }
    request=()=>{
        axios.ajax({
            url:"/table/highlist",
            data:{
                params:{
                    page:1
                }
            }
        }).then(res=>{
            if(res.status=="10001"){
                res.result.list.map((item,index)=>item.key=index)
                this.setState({
                    dataSource:res.result.list
                })
            }
        })
    }
   
    render(){
        // 表头配置
        const columns=[
            {
                title:"id",
               
                width:80,
                dataIndex:'id'
            },
            {
                title:"用户名",
                width:80,
                dataIndex:"username"
            } ,
            {
                title:"性别",
                width:80,
                dataIndex:"sex",
                render(sex){
                    return sex==1?"男":"女";
                }
            },
            {
                title:"状态",
                width:80,
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
                width:100,
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
                width:120,
                dataIndex:"birthday"
            },
            {
                title:"地址",
                width:120,
                dataIndex:"address"
            },
            {
                title:"早起时间",
                width:120,
                dataIndex:"time"
            }
    ]
    const columns3=[
        {
            title:"id",
          
            dataIndex:'id'
        },
        
        {
            title:"用户名",
         
            dataIndex:"username"
        } ,
        {
            title:"年龄",
            dataIndex:"age",
            sorter:(a,b)=>{
                return a.age-b.age;
            },
            sorterOrder:this.state.sorterOrder
        },
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
    const columns2=[
        {
            title:"id",
            fixed:"left",
            width:80,
            dataIndex:'id'
        },
        {
            title:"用户名",
            fixed:"left",
            width:80,
            dataIndex:"username"
        } ,
        {
            title:"性别",
            width:80,
            dataIndex:"sex",
            render(sex){
                return sex==1?"男":"女";
            }
        },
        {
            title:"状态",
            width:80,
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
            width:100,
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
        },{
            title:"常用的英雄",
            width:100,
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
        },{
            title:"常用的英雄",
            width:100,
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
        },{
            title:"常用的英雄",
            width:100,
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
        },{
            title:"常用的英雄",
            width:100,
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
        },{
            title:"常用的英雄",
            width:100,
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
        },{
            title:"常用的英雄",
            width:100,
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
        },{
            title:"常用的英雄",
            width:100,
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
        },{
            title:"常用的英雄",
            width:100,
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
        },{
            title:"常用的英雄",
            width:100,
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
        },{
            title:"常用的英雄",
            width:100,
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
        },{
            title:"常用的英雄",
            width:100,
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
            width:120,
            dataIndex:"birthday"
        },
        {
            title:"地址",
           
            width:120,
            dataIndex:"address"
        },
        {
            title:"早起时间",
            fixed:"right",
            width:120,
            dataIndex:"time"
        }
]
const columns4=[
    {
        title:"id",
      
        dataIndex:'id'
    },
    
    {
        title:"用户名",
     
        dataIndex:"username"
    } ,
    {
        title:"年龄",
        dataIndex:"age",
        sorter:(a,b)=>{
            return a.age-b.age;
        },
        sorterOrder:this.state.sorterOrder
    },
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
                "1":<Badge status="success" text="胜利"/>,
                "2":<Badge status="error" text="失败"/>,
                "3":<Badge status="default" text="未参与"/>,
                "4":<Badge status="processing" text="游戏中"/>,
                "5":<Badge status="warning" text="待定"/>
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
    },
    {
        title:"操作",
        render:(state,item)=>{
          
            return (<Button type="danger" onClick={()=>this.handleDelete(item)} >删除</Button>)
        }
    }
]       
return(
            <div>
                <Card title="Y轴滚动">
                <Table
                  bordered
                  columns={columns}
                  dataSource={this.state.dataSource}
                  scroll={{y:240}}
                />
                </Card>
                <Card title="左右固定">
                <Table
                    bordered
                    columns={columns2}
                    dataSource={this.state.dataSource}
                    scroll={{x:1880}}
                    // pagination={false}
                />
                </Card>
                <Card title="表格排序">
                <Table
                    bordered
                    columns={columns3}
                    dataSource={this.state.dataSource}
                    onChange={this.handleChange}
                    pagination={false}
                />
                </Card>
                <Card title="表格操作">
                    <Table
                     bordered
                     columns={columns4}
                     dataSource={this.state.dataSource}
                    pagination={false}
                    />
                </Card>
            </div>
        )
    }
}