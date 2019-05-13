import React from 'react';
import {Card,Row,Col,Modal}  from 'antd';

export default class Gallery extends React.Component{
   state={
    visible:false
   }
   showModal=imgUrl=>{
       this.setState({
           visible:true,
           imgUrl:'/gallery/'+imgUrl
       })
   }
    render(){
        const imgs=[
            ["1.png","2.png","3.png","4.png","5.png"],
            ["6.png","7.png","8.png","9.png","10.png"],
            ["11.png","12.png","13.png","14.png","15.png"],
            ["16.png","17.png","18.png","19.png","20.png"],
            ["21.png","22.png","23.png","24.png","25.png"],
            ["19.png","15.png","4.png","24.png","25.png"]
        ];
        const imgList=imgs.map((list,index)=>(
        
            <Col  key={index}  md={4}>{list.map((item,index)=>
                (<Card key={index} onClick={()=>this.showModal(item)} style={{marginBottom:10}} cover={<img src={"/gallery/"+item} />}>
                    <Card.Meta
                      title="react and vue"
                      description="this is very good"
                     />
                </Card>)
            )}
            </Col>
       )
        )
            
        return(
            <div>
                <Row gutter={10}>
                     {imgList}
                </Row>
                 <Modal
                  style={{top:10}}
                  width={300}
                  height={300}
                  title="画廊"
                  visible={this.state.visible}
                  onCancel={()=>this.setState({visible:false})}
                  footer={null}
                 >
                  <img src={this.state.imgUrl} style={{width:"100%"}}/>    
                 </Modal>
            </div>
        )
    }
}