import React from 'react';
import { Spin,Card,Icon,Alert} from 'antd';
import "./../ui.less"
export default class Loadings extends React.Component{
    render(){
        const icon=<Icon type="plus" spin style={{fontSize:24}} />;
        const loading=<Icon type="sync" spin />;
            return (
            <div>
                <Card title="Spin用法" className="spin-wrap">
                    <Spin size="small"/>
                    <Spin/>
                    <Spin size="large"/>
                    <Spin indicator={icon} />
                </Card>
                <Card title="内容遮罩" className="alert-wrap">
                  <Spin >
                    <Alert style={{margin:"10px 0"}}
                        message="antd"
                        description="欢迎来到北京"
                        type="info"
                    />
                    </Spin>
                    <Spin >
                    <Alert style={{margin:"10px 0"}}
                        message="antd"
                        description="欢迎来到北京"
                        type="warning"
                    />
                    </Spin>
                    <Spin  tip="加载中....">
                    <Alert style={{margin:"10px 0"}}
                        message="antd"
                        description="欢迎来到北京"
                        type="warning"
                    />
                    </Spin>
                    <Spin   indicator={loading}>
                        <Alert style={{margin:"10px 0"}}
                        message="dva"
                        description="来吧"
                        type="info"
                        
                        />
                    </Spin>
                </Card>
            </div>
            )
    }
}