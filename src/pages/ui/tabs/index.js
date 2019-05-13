import React from 'react';
import { Card, message, Tabs, Icon } from 'antd';

const TabPane = Tabs.TabPane;

export default class Tab extends React.Component {
    newTabIndex=0;
    componentWillMount() {
        const panes = [
            {
                title: "tab 1",
                content: "欢迎来到杭州",
                key: "1"
            },
            {
                title: "tab 2",
                content: "欢迎来到杭州",
                key: "2"
            },
            {
                title: "tab 3",
                content: "欢迎来到杭州",
                key: "3"
            }
        ];
        this.setState({
            activeKey:panes[0].key,
            panes
        });
    }
    onChange = (activeKey) => {
        this.setState({ activeKey });
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
    }

    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.setState({ panes, activeKey });
    }

    handleCallback = (key) => {
        message.info("hi,你选择了" + key + "号女嘉宾！");
    }
    render() {
        return (
            <div>
                <Card title="Tab页签" className="button-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab="tab 1" key="1"> tab 1</TabPane>
                        <TabPane tab="tab 2" key="2" disabled> tab 2</TabPane>
                        <TabPane tab="tab 3" key="3"> tab 3</TabPane>
                    </Tabs>
                </Card>
                <Card title="带图标的tab页签">
                    <Tabs defaultActiveKey="dd" >
                        <TabPane tab={<span><Icon type="plus" />tab 1</span>} key="1">tab 1</TabPane>
                        <TabPane tab={<span><Icon type="delete" />tab 2</span>} key="dd">tab 2</TabPane>
                        <TabPane tab={<span><Icon type="edit" />tab 2</span>} key="3">tab 3</TabPane>
                    </Tabs>
                </Card>
                <Card title="动态添加删除tab页签">
                    <Tabs
                        onChange={this.onChange}
                        activeKey={this.state.activeKey}
                        type="editable-card"
                        onEdit={this.onEdit}
                    >
                        {
                            this.state.panes.map(item => (
                                <TabPane tab={item.title} key={item.key}>{item.content}</TabPane>
                            ))
                        }
                    </Tabs>
                </Card>
            </div>
        )
    }
}
